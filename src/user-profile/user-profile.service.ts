import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import UserProfile from './entities/user-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileAvatar } from './entities/profile-avatar.entity';

interface UpdateProfileOptions {
  profileData: UpdateProfileDto;
  userId: string;
}

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @InjectRepository(ProfileAvatar)
    private readonly profileAvatarRepository: Repository<ProfileAvatar>,
  ) {}

  async getProfile(userId: string) {
    const userProfile = await this.userProfileRepository.findOne({
      where: { user: Equal(userId) },
      relations: ['user', 'profileAvatar', 'profileAvatar.group'],
    });

    return userProfile;
  }

  async updateProfile({
    userId,
    profileData: { birthDate, avatarId, ...profileData },
  }: UpdateProfileOptions) {
    const updatePayload: Partial<UserProfile> = {
      ...profileData,
      birthDate: new Date(birthDate?.toISOString() || ''),
    };

    if (avatarId) {
      const avatar = await this.profileAvatarRepository.findOne({
        where: { id: Equal(avatarId) },
      });

      if (avatar) {
        updatePayload.profileAvatar = avatar;
      }
    }

    await this.userProfileRepository.update(
      {
        user: {
          id: Equal(userId),
        },
      },
      updatePayload,
    );

    return { message: 'Profile updated successfully' };
  }

  async getProfileAvatars() {
    const avatars = await this.profileAvatarRepository.find({
      relations: ['group'],
    });
    return avatars;
  }
}
