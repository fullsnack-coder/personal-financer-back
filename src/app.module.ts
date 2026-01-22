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
      host: '192.168.1.35',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'personal_financer',
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
