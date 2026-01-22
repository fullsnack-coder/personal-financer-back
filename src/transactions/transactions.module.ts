import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { FundsService } from 'src/funds/funds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), FundsService],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
