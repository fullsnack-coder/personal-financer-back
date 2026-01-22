import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { FundsModule } from './funds/funds.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonController } from './common.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: '',
      synchronize: false,
      autoLoadEntities: true,
    }),
    TransactionsModule,
    FundsModule,
    CategoriesModule,
  ],
  controllers: [CommonController],
  providers: [],
})
export class AppModule {}
