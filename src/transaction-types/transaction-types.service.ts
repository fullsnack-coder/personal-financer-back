import { TransactionType } from '@/transactions/entities/transaction-type.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class TransactionTypesService {
  constructor(
    @InjectRepository(TransactionType)
    private transactionTypeRepository: Repository<TransactionType>,
  ) {}

  async findAll(): Promise<TransactionType[]> {
    return this.transactionTypeRepository.find();
  }

  async findOne(id: number): Promise<TransactionType | null> {
    return this.transactionTypeRepository.findOne({
      where: { id: Equal(id) },
    });
  }
}
