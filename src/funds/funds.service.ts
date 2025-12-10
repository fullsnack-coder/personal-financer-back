import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { categories } from 'src/categories/categories.service';

let funds = [
  {
    id: 1,
    name: 'Emergency Fund',
    balance: '$12,345.67',
    cover: {
      url: 'https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg',
    },
    category: {
      id: 1,
      name: 'Savings',
      coverUrl:
        'https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg',
    },
  },
  {
    id: 2,
    name: 'Vacation Fund',
    balance: '$4,500.00',
    cover: {
      url: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
    },
    category: {
      id: 2,
      name: 'Leisure',
      coverUrl:
        'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
    },
  },
];

@Injectable()
export class FundsService {
  create(createFundDto: CreateFundDto) {
    const category = categories.find(
      (cat) => cat.id === createFundDto.categoryId,
    );

    if (!category) {
      throw new Error('Category not found');
    }

    const newFund = {
      id: funds.length + 1,
      name: createFundDto.name,
      balance: createFundDto.initialBalance.toString(),
      cover: { url: category.coverUrl },
      category: {
        id: category.id,
        name: category.name,
        coverUrl: category.coverUrl,
      },
    };

    funds.push(newFund);
    return newFund;
  }

  findAll() {
    return funds;
  }

  findOne(id: number) {
    return funds.find((fund) => fund.id === id);
  }

  update(id: number, updateFundDto: UpdateFundDto) {
    const fundIndex = funds.findIndex((fund) => fund.id === id);
    if (fundIndex === -1) {
      throw new Error('Fund not found');
    }

    const updatedFund = { ...funds[fundIndex], ...updateFundDto };
    funds[fundIndex] = updatedFund;
    return updatedFund;
  }

  remove(id: number) {
    const newFunds = funds.filter((fund) => fund.id !== id);
    if (newFunds.length === funds.length) {
      throw new Error('Fund not found');
    }

    funds = newFunds;
    return { message: 'Fund removed successfully' };
  }
}
