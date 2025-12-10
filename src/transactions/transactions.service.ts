import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

const fund = {
  id: 1,
  name: 'Emergency Fund',
  balance: 1000,
  cover: { url: 'https://example.com/cover.jpg' },
  category: {
    id: 1,
    name: 'Sample Category',
    coverUrl: 'https://example.com/category-cover.jpg',
  },
};

const transactions = [
  {
    id: 1,
    amount: 100,
    description: 'Sample transaction',
    date: new Date().toISOString(),
    fund,
  },
  {
    id: 2,
    amount: 250,
    description: 'Another transaction',
    date: new Date().toISOString(),
    fund,
  },
];

@Injectable()
export class TransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return transactions;
    // throw new Error('Method not implemented.');
  }

  findOne(id: number) {
    console.log({ id });
    return transactions.find((transaction) => transaction.id === id);
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
