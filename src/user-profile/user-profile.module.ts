import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserProfile from './entities/user-profile.entity';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
  imports: [TypeOrmModule.forFeature([UserProfile]), AuthModule],
  exports: [UserProfileService],
})
export class UserProfileModule {}
