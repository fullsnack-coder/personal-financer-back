import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { CurrentSession } from '@/auth/decorators/current-session.decorator';
import type { SessionPayload } from '@/types/auth';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}
  @Get()
  @UseGuards(AuthGuard)
  getProfile(@CurrentSession() { id }: SessionPayload) {
    return this.userProfileService.getProfile(id);
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only image files are allowed'), false);
        }
      },
    }),
  )
  updateProfile(
    @CurrentSession() { id: userId }: SessionPayload,
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
