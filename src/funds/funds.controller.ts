import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FundsService } from './funds.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { FundOwnerGuard } from './guards/fund-owner.guard';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { CurrentSession } from '@/auth/decorators/current-session.decorator';
import { PaginationDto } from '@/common/dto/pagination.dto';
import type { SessionPayload } from '@/types/auth';

@Controller('funds')
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createFundDto: CreateFundDto,
    @CurrentSession() session: SessionPayload,
  ) {
    return this.fundsService.create(createFundDto, session.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @CurrentSession() session: SessionPayload,
    @Query(new ValidationPipe({ transform: true }))
    queryParams: PaginationDto,
  ) {
    const { page, size } = queryParams;
    return this.fundsService.findAll(session.id, { page, size });
  }

  @Get(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  findOne(@Param('id') id: string, @CurrentSession() session: SessionPayload) {
    return this.fundsService.findOne({
      fundId: id,
      userId: session.id,
    });
  }

  @Get(':id/summary')
  @UseGuards(AuthGuard, FundOwnerGuard)
  fundSummary(
    @Param('id') id: string,
    @CurrentSession() session: SessionPayload,
  ) {
    return this.fundsService.fundSummary(session.id, id);
  }

  @Get(':id/transactions')
  @UseGuards(AuthGuard, FundOwnerGuard)
  getFundTransactions(
    @Param('id') id: string,
    @CurrentSession() session: SessionPayload,
    @Query(new ValidationPipe({ transform: true }))
    queryParams: PaginationDto,
  ) {
    const { page, size } = queryParams;

    return this.fundsService.getFundTransactions(session.id, id, {
      page,
      size,
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  update(
    @Param('id') id: string,
    @Body() updateFundDto: UpdateFundDto,
    @CurrentSession() session: SessionPayload,
  ) {
    return this.fundsService.update(id, session.id, updateFundDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, FundOwnerGuard)
  remove(@Param('id') id: string, @CurrentSession() session: SessionPayload) {
    return this.fundsService.remove(id, session.id);
  }
}
