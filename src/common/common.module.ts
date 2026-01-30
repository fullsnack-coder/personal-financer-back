import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '@/transactions/entities/transaction.entity';
import { StatisticsService } from './services/statistics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [CommonController],
  providers: [StatisticsService],
})
export class CommonModule {}
