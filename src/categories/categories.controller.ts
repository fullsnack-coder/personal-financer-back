import { Controller, Get, Logger, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    Logger.log(this.categoriesService.findAll());
    return {
      ok: true,
      data: this.categoriesService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
}
