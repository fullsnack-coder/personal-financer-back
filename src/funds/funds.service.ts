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

@Injectable()
export class FundsService {
  constructor(
    @InjectRepository(Fund) private fundRepository: Repository<Fund>,
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

  findOne(id: string, userId: string) {
    return this.fundRepository.findOne({
      where: { id: Equal(id), user: { id: Equal(userId) } },
      relations: { user: true, category: true },
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
}
