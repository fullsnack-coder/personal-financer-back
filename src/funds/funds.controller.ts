import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FundsService } from './funds.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { FundOwnerGuard } from './guards/fund-owner.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createFundDto: CreateFundDto) {
    return this.fundsService.create(createFundDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.fundsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  findOne(@Param('id') id: string) {
    return this.fundsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  update(@Param('id') id: string, @Body() updateFundDto: UpdateFundDto) {
    return this.fundsService.update(id, updateFundDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  remove(@Param('id') id: string) {
    return this.fundsService.remove(id);
  }
}
