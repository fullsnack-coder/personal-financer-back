import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}
  @Get(':userId')
  @UseGuards(AuthGuard)
  getProfile(@Param('userId') userId: string) {
    return this.userProfileService.getProfile(userId);
  }

  @Put(':userId')
  @UseInterceptors(FileInterceptor('avatar'))
  updateProfile(
    @Param('userId') userId: string,
    @Body() profileData: UpdateProfileDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userProfileService.updateProfile({
      userId,
      profileData,
      avatar,
    });
  }
}
