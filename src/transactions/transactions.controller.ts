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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionOwnerGuard } from './guards/transaction-owner.guard';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  create(
    @UploadedFile() transactionFile: Express.Multer.File,
    @Body() createTransactionDto: Omit<CreateTransactionDto, 'transactionFile'>,
  ) {
    return this.transactionsService.create({
      transactionFile,
      ...createTransactionDto,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.transactionsService.findAll();
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
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, TransactionOwnerGuard)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
