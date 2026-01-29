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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionOwnerGuard } from './guards/transaction-owner.guard';
import { TransactionsService } from './transactions.service';
import type { SessionPayload } from '@/types/auth';
import { CurrentSession } from '@/auth/decorators/current-session.decorator';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  create(
    @UploadedFile() transactionFile: Express.Multer.File,
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentSession() session: SessionPayload,
  ) {
    return this.transactionsService.create(
      {
        transactionFile,
        ...createTransactionDto,
      },
      session.id,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @CurrentSession() session: SessionPayload,
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    queryOptions: PaginationDto,
  ) {
    return this.transactionsService.findAll(session.id, queryOptions);
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
    @CurrentSession() session: SessionPayload,
  ) {
    return this.transactionsService.update(
      id,
      updateTransactionDto,
      session.id,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, TransactionOwnerGuard)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
