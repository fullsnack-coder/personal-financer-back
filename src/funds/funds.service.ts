import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { Fund } from './entities/fund.entity';

@Injectable()
export class FundsService {
  constructor(
    @InjectRepository(Fund) private fundRepository: Repository<Fund>,
    private categoriesService: CategoriesService,
  ) {}
  async create({ categoryId, initialBalance, name }: CreateFundDto) {
    const fundCategory = await this.categoriesService.findOne(categoryId);

    if (!fundCategory) {
      throw new NotFoundException('Category not found');
    }

    const createdFund = this.fundRepository.create({
      title: name,
      balance: initialBalance,
      category: fundCategory,
    });

    await this.fundRepository.save(createdFund);
  }

  findAll() {
    return this.fundRepository.find({
      relations: { category: true },
      select: {
        category: {
          id: true,
          title: true,
        },
      },
    });
  }

  findOne(id: string) {
    return this.fundRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
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

    const updatedFund = await this.fundRepository.update({ id }, updateBody);

    return updatedFund;
  }

  async remove(id: string) {
    await this.fundRepository.softDelete({ id });
  }
}
