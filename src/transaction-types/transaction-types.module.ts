import { Module } from '@nestjs/common';
import { TransactionType } from '@/transactions/entities/transaction-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypesController } from './transaction-types.controller';
import { TransactionTypesService } from './transaction-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType])],
  providers: [TransactionTypesService],
  controllers: [TransactionTypesController],
  exports: [TransactionTypesService],
})
export class TransactionTypesModule {}
