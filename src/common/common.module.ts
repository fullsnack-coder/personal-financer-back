import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '@/transactions/entities/transaction.entity';
import { AccountsModule } from '@/accounts/accounts.module';
import UserDevice from '@/accounts/entities/user-device.entity';
import { CommonController } from './common.controller';
import SQSService from './services/sqs.service';
import { StatisticsService } from './services/statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, UserDevice]),
    AccountsModule,
  ],
  controllers: [CommonController],
  providers: [StatisticsService, SQSService],
})
export class CommonModule {}
