import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FundsService } from 'src/funds/funds.service';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private fundsService: FundsService,
  ) {}

  async create({ amount, fundId }: CreateTransactionDto) {
    const transactionFund = await this.fundsService.findOne(fundId);

    if (!transactionFund) throw new NotFoundException('Fund not found');

    const createdTransaction = this.transactionRepository.create({
      fund: transactionFund,
      amount,
    });

    await this.transactionRepository.save(createdTransaction);

    return createdTransaction;
  }

  findAll() {
    return this.transactionRepository.find();
  }

  async findOne(id: string) {
    await this.transactionRepository.findOneBy({ id });
  }

  async update(id: string, { amount, fundId }: UpdateTransactionDto) {
    const updatePayload: Partial<Transaction> = { amount };

    if (fundId) {
      const transactionFund = await this.fundsService.findOne(fundId);
      if (!transactionFund) throw new NotFoundException('Fund not found');

      updatePayload.fund = transactionFund;
    }

    await this.transactionRepository.update({ id }, updatePayload);
  }

  remove(id: string) {
    return this.transactionRepository.softDelete({ id });
  }
}
