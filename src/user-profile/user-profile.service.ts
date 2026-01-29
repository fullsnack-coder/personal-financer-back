import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'fs';
import { Equal, Repository } from 'typeorm';
import UserProfile from './entities/user-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

interface UpdateProfileOptions {
  profileData: UpdateProfileDto;
  userId: string;
  avatar?: Express.Multer.File;
}

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async getProfile(userId: string) {
    const userProfile = await this.userProfileRepository.findOneBy({
      id: Equal(userId),
    });

    return userProfile;
  }

  async updateProfile({ userId, profileData, avatar }: UpdateProfileOptions) {
    const updatePayload: Partial<UserProfile> = { ...profileData };

    if (avatar) {
      const { mimetype } = avatar;
      const uploadPath = `uploads/avatars/${Date.now()}.${mimetype.split('/')[1]}`;

      await promises.writeFile(uploadPath, avatar.buffer);

      updatePayload.avatarUrl = uploadPath.replace('uploads/', '/static/');
    }

    await this.userProfileRepository.update({ id: userId }, updatePayload);

    return { message: 'Profile updated successfully' };
  }
}
