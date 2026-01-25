import { Module } from '@nestjs/common';
import { FundsService } from './funds.service';
import { FundsController } from './funds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fund } from './entities/fund.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { AccountsModule } from '@/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fund]), CategoriesModule, AccountsModule],
  controllers: [FundsController],
  providers: [FundsService],
  exports: [FundsService],
})
export class FundsModule {}
