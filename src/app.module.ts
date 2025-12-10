import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { FundsModule } from './funds/funds.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonController } from './common.controller';

@Module({
  imports: [TransactionsModule, FundsModule, CategoriesModule],
  controllers: [CommonController],
  providers: [],
})
export class AppModule {}
