import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import UserProfile from './entities/user-profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileAvatar } from './entities/profile-avatar.entity';
import ProfilePreferences from './entities/profile-preferences.entity';
import { mapBooleanToString } from './utils/map-boolean-to-string';

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
    @InjectRepository(ProfilePreferences)
    private readonly profilePreferencesRepository: Repository<ProfilePreferences>,
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

  private async registerProfilePreference(
    userId: string,
    preferenceKey: string,
    preferenceValue: string,
  ) {
    const newPreference = this.profilePreferencesRepository.create({
      user: { id: userId },
      preferenceKey,
      preferenceValue,
    });

    await this.profilePreferencesRepository.save(newPreference);
  }

  async updateProfilePreference(
    userId: string,
    preferenceKey: string,
    preferenceValue: string | boolean,
  ) {
    const existingPreference = await this.profilePreferencesRepository.findOne({
      where: {
        user: { id: Equal(userId) },
        preferenceKey: Equal(preferenceKey),
      },
    });

    if (existingPreference) {
      existingPreference.preferenceValue =
        typeof preferenceValue === 'boolean'
          ? mapBooleanToString(preferenceValue)
          : preferenceValue;

      await this.profilePreferencesRepository.save(existingPreference);
    } else {
      await this.registerProfilePreference(
        userId,
        preferenceKey,
        typeof preferenceValue === 'boolean'
          ? mapBooleanToString(preferenceValue)
          : preferenceValue,
      );
    }

    return { message: 'Profile preference updated successfully' };
  }

  async getProfilePreferences(userId: string) {
    const preferences = await this.profilePreferencesRepository.find({
      where: {
        user: { id: Equal(userId) },
      },
    });

    return preferences;
  }
}
