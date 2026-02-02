import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
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
  @UseGuards(AuthGuard)
  updateProfile(
    @CurrentSession() { id: userId }: SessionPayload,
    @Body() profileData: UpdateProfileDto,
  ) {
    console.log({ profileData });
    return this.userProfileService.updateProfile({
      userId,
      profileData,
    });
  }

  @Get('avatars')
  @UseGuards(AuthGuard)
  getProfileAvatars() {
    return this.userProfileService.getProfileAvatars();
  }
}
