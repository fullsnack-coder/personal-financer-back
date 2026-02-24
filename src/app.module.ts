import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { FundsModule } from './funds/funds.module';
import { CategoriesModule } from './categories/categories.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './common/config/app.config';
import { TransactionTypesModule } from './transaction-types/transaction-types.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT') || '3306', 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('TOKENS_DATABASE_HOST'),
        port: parseInt(configService.get('TOKENS_DATABASE_PORT') || '3306', 10),
        username: configService.get('TOKENS_DATABASE_USER'),
        password: configService.get('TOKENS_DATABASE_PASSWORD'),
        database: configService.get('TOKENS_DATABASE_NAME'),
        synchronize: false,
        autoLoadEntities: true,
      }),
      name: 'user_devices',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),
    TransactionsModule,
    FundsModule,
    CategoriesModule,
    UserProfileModule,
    AuthModule,
    AccountsModule,
    TransactionTypesModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
