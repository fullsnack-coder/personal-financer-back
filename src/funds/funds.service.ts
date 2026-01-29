import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Equal, FindOptionsWhere, Repository } from 'typeorm';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { Fund } from './entities/fund.entity';
import { AccountsService } from '@/accounts/accounts.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResult } from '@/common/types/pagination';
import { Transaction } from '@/transactions/entities/transaction.entity';
import { TransactionTypeName } from '@/transactions/types/transaction-type-name.enum';

interface FindFundOptions {
  fundId: string;
  userId: string;
  includeTransactions?: boolean;
}

@Injectable()
export class FundsService {
  constructor(
    @InjectRepository(Fund) private fundRepository: Repository<Fund>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
  ) {}
  async create(
    {
      categoryId,
      initialBalance,
      name,
      currencyCode,
      description,
    }: CreateFundDto,
    userId: string,
  ) {
    const fundCategory = await this.categoriesService.findOne(categoryId);

    if (!fundCategory) {
      throw new NotFoundException('Category not found');
    }

    const fundUser = await this.accountsService.findUserById(userId);

    if (!fundUser) {
      throw new NotFoundException('User not found');
    }

    const createdFund = this.fundRepository.create({
      title: name,
      balance: initialBalance,
      category: fundCategory,
      user: fundUser,
      currencyCode,
      description,
    });

    await this.fundRepository.save(createdFund);
  }

  async findAll(
    userId: string,
    { page = 1, size = 10 }: PaginationDto,
  ): Promise<PaginatedResult<Array<Fund>>> {
    const findConditions: FindOptionsWhere<Fund> = { user: { id: userId } };

    const userFunds = await this.fundRepository.find({
      where: findConditions,
      relations: { category: true, user: true },
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'DESC' },
      select: {
        category: {
          id: true,
          title: true,
        },
        user: {
          id: true,
          username: true,
        },
      },
    });

    const totalFunds = await this.fundRepository.count({
      where: findConditions,
    });

    return {
      data: userFunds,
      pagination: {
        total: totalFunds,
        page,
        pageSize: size,
        totalPages: Math.ceil(totalFunds / size),
      },
    };
  }

  findOne({ fundId, userId, includeTransactions = false }: FindFundOptions) {
    return this.fundRepository.findOne({
      where: { id: Equal(fundId), user: { id: Equal(userId) } },
      relations: {
        user: true,
        category: true,
        transactions: includeTransactions,
      },
      select: {
        user: {
          id: true,
          username: true,
        },
        category: {
          id: true,
          title: true,
        },
      },
    });
  }

  async update(
    id: string,
    userId: string,
    { categoryId, initialBalance, name }: UpdateFundDto,
  ) {
    const updateBody: Partial<Fund> = {
      balance: initialBalance,
      title: name,
    };

    if (categoryId) {
      const fundCategory = await this.categoriesService.findOne(categoryId);

      if (!fundCategory) throw new NotFoundException('Category not found');

      updateBody.category = fundCategory;
    }

    const updatedFund = await this.fundRepository.update(
      { id, user: { id: userId } },
      updateBody,
    );

    return updatedFund;
  }

  async remove(id: string, userId: string) {
    await this.fundRepository.softDelete({ id, user: { id: userId } });
  }

  private async calculateCurrentBalance(
    fundId: string,
    initialBalance: number,
  ) {
    const allExpenses = await this.transactionRepository.sum('amount', {
      transactionType: { typeName: TransactionTypeName.EXPENSE },
      fund: { id: Equal(fundId) },
    });

    const allIncomes = await this.transactionRepository.sum('amount', {
      transactionType: { typeName: TransactionTypeName.INCOME },
      fund: { id: Equal(fundId) },
    });

    const currentBalance =
      Number(initialBalance) + (allIncomes || 0) - (allExpenses || 0);

    return currentBalance.toFixed(2);
  }

  async fundSummary(userId: string, fundId: string) {
    const fund = await this.findOne({
      fundId,
      userId,
    });

    if (!fund) {
      throw new NotFoundException('Fund not found');
    }

    const currentBalance = await this.calculateCurrentBalance(
      fundId,
      fund.balance,
    );

    const totalTransactions = await this.transactionRepository.count({
      where: { fund: { id: Equal(fundId) } },
    });

    return {
      fundId: fund.id,
      title: fund.title,
      initialBalance: fund.balance,
      currencyCode: fund.currencyCode,
      currentBalance,
      totalTransactions,
    };
  }

  async getFundTransactions(
    userId: string,
    fundId: string,
    { page = 1, size = 10 }: PaginationDto,
  ): Promise<PaginatedResult<Array<Transaction>>> {
    const findConditions: FindOptionsWhere<Transaction> = {
      fund: { id: Equal(fundId), user: { id: Equal(userId) } },
    };

    const [userTransactions, totalItems] =
      await this.transactionRepository.findAndCount({
        relations: ['fund', 'fund.category', 'transactionType'],
        skip: (page - 1) * size,
        where: findConditions,
        order: { createdAt: 'DESC' },
        take: size,
      });

    return {
      data: userTransactions,
      pagination: {
        total: totalItems,
        page,
        pageSize: size,
        totalPages: Math.ceil(totalItems / size),
      },
    };
  }
}
