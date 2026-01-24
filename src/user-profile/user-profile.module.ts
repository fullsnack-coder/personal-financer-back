import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from '../accounts/accounts.module';
import UserProfile from './entities/user-profile.entity';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
  imports: [TypeOrmModule.forFeature([UserProfile]), AccountsModule],
  exports: [UserProfileService],
})
export class UserProfileModule {}
