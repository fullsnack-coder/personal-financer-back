import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AccountsService } from './accounts.service';
import UserDevice from './entities/user-device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDevice])],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
