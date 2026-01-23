import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}
  @Get(':userId')
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
