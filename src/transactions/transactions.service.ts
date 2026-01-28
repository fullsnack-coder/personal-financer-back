import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FundsService } from 'src/funds/funds.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { promises } from 'node:fs';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResult } from '@/common/types/pagination';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private fundsService: FundsService,
  ) {}

  async create(
    { amount, fundId, transactionFile, description }: CreateTransactionDto,
    userId: string,
  ) {
    const transactionFund = await this.fundsService.findOne(fundId, userId);

    if (!transactionFund) throw new NotFoundException('Fund not found');

    const transactionPayload: Partial<Transaction> = {
      fund: transactionFund,
      amount,
      description,
    };

    if (transactionFile) {
      const { mimetype } = transactionFile;
      const uploadPath = `uploads/transactions/${Date.now()}.${mimetype.split('/')[1]}`;

      await promises.writeFile(uploadPath, transactionFile.buffer);

      transactionPayload.voucherImageUrl = uploadPath;
    }

    const createdTransaction =
      this.transactionRepository.create(transactionPayload);

    await this.transactionRepository.save(createdTransaction);

    return createdTransaction;
  }

  async findAll(
    userId: string,
    { page = 1, size = 10 }: PaginationDto,
  ): Promise<PaginatedResult<Array<Transaction>>> {
    const findConditions: FindOptionsWhere<Transaction> = {
      fund: { user: { id: userId } },
    };

    const totalItems = await this.transactionRepository.count({
      where: findConditions,
    });

    const userTransactions = await this.transactionRepository.find({
      relations: ['fund', 'fund.user', 'fund.category'],
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

  findOne(id: string) {
    return this.transactionRepository.findOne({
      where: { id },
      relations: ['fund', 'fund.user', 'fund.category'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: string,
    { amount, fundId, description }: UpdateTransactionDto,
    userId: string,
  ) {
    const updatePayload: Partial<Transaction> = { amount, description };

    if (fundId) {
      const transactionFund = await this.fundsService.findOne(fundId, userId);
      if (!transactionFund) throw new NotFoundException('Fund not found');

      updatePayload.fund = transactionFund;
    }

    await this.transactionRepository.update({ id }, updatePayload);
  }

  remove(id: string) {
    return this.transactionRepository.softDelete({ id });
  }
}
