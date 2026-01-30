import { Transaction } from '@/transactions/entities/transaction.entity';
import { TransactionTypeName } from '@/transactions/types/transaction-type-name.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchStatisticDto } from '../dto/search-statistic.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getExpensesIncome(options: SearchStatisticDto) {
    const { from, to, fundId, currency } = options || {};

    const { total: expensesTotal = '0' } =
      (await this.transactionRepository
        .createQueryBuilder('transaction')
        .select('SUM(transaction.amount)', 'total')
        .leftJoin('transaction.transactionType', 'transactionType')
        .addSelect('transactionType.typeName', 'typeName')
        .where('transactionType.typeName = :type', {
          type: TransactionTypeName.EXPENSE,
        })
        .andWhere(
          from && to
            ? 'transaction.createdAt BETWEEN :from AND :to'
            : from
              ? 'transaction.createdAt >= :from'
              : to
                ? 'transaction.createdAt <= :to'
                : '1=1',
          { from, to },
        )
        .andWhere(fundId ? 'transaction.fundId = :fundId' : '1=1', { fundId })
        .andWhere(currency ? 'transaction.currencyCode = :currency' : '1=1', {
          currency,
        })
        .getRawOne<{ total: string }>()) || {};

    const { total: incomeTotal = '0' } =
      (await this.transactionRepository
        .createQueryBuilder('transaction')
        .select('SUM(transaction.amount)', 'total')
        .leftJoin('transaction.transactionType', 'transactionType')
        .addSelect('transactionType.typeName', 'typeName')
        .where('transactionType.typeName = :type', {
          type: TransactionTypeName.INCOME,
        })
        .andWhere(
          from && to
            ? 'transaction.createdAt BETWEEN :from AND :to'
            : from
              ? 'transaction.createdAt >= :from'
              : to
                ? 'transaction.createdAt <= :to'
                : '1=1',
          { from, to },
        )
        .andWhere(fundId ? 'transaction.fundId = :fundId' : '1=1', { fundId })
        .andWhere(currency ? 'transaction.currencyCode = :currency' : '1=1', {
          currency,
        })
        .getRawOne<{ total: string }>()) || {};

    return {
      expenses: parseFloat(expensesTotal) || 0,
      incomes: parseFloat(incomeTotal) || 0,
      currency,
    };
  }
}
