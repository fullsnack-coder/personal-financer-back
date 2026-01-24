import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionOwnerGuard } from './guards/transaction-owner.guard';
import { TransactionsService } from './transactions.service';
import { AuthPayload } from '@/types/auth';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  create(
    @UploadedFile() transactionFile: Express.Multer.File,
    @Body() createTransactionDto: Omit<CreateTransactionDto, 'transactionFile'>,
    @Request() req: ExpressRequest,
  ) {
    return this.transactionsService.create(
      {
        transactionFile,
        ...createTransactionDto,
      },
      (req.user as AuthPayload).id,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() req: ExpressRequest) {
    return this.transactionsService.findAll((req.user as AuthPayload).id);
  }

  @Get(':id')
  @UseGuards(AuthGuard, TransactionOwnerGuard)
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, TransactionOwnerGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req: ExpressRequest,
  ) {
    return this.transactionsService.update(
      id,
      updateTransactionDto,
      (req.user as AuthPayload).id,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, TransactionOwnerGuard)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
