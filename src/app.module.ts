import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { FundsModule } from './funds/funds.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonController } from './common.controller';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './common/config/app.config';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot(appConfig),
    TransactionsModule,
    FundsModule,
    CategoriesModule,
    UserProfileModule,
    AuthModule,
    AccountsModule,
  ],
  controllers: [CommonController],
  providers: [],
})
export class AppModule {}
