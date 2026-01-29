import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { FundsModule } from 'src/funds/funds.module';
import { TransactionType } from './entities/transaction-type.entity';
import { TransactionTypesModule } from '@/transaction-types/transaction-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionType]),
    FundsModule,
    TransactionTypesModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
