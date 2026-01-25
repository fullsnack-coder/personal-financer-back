import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { FundsService } from './funds.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { FundOwnerGuard } from './guards/fund-owner.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { AuthPayload } from '@/types/auth';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createFundDto: CreateFundDto, @Request() req: ExpressRequest) {
    return this.fundsService.create(
      createFundDto,
      (req.user as AuthPayload).id,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() req: ExpressRequest) {
    return this.fundsService.findAll((req.user as AuthPayload).id);
    // TODO: return { data: funds, total: number, page: number, pageSize: number, totalPages: number, and ok: boolean }
  }

  @Get(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.fundsService.findOne(id, (req.user as AuthPayload).id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  update(
    @Param('id') id: string,
    @Body() updateFundDto: UpdateFundDto,
    @Request() req: ExpressRequest,
  ) {
    return this.fundsService.update(
      id,
      (req.user as AuthPayload).id,
      updateFundDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.fundsService.remove(id, (req.user as AuthPayload).id);
  }
}
