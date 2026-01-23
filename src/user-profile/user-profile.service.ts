import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserProfile from './entities/user-profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { promises } from 'fs';
import { CreateProfileDto } from './dto/create-profile.dto';
import { AuthService } from '../auth/auth.service';

interface UpdateProfileOptions {
  profileData: UpdateProfileDto;
  userId: string;
  avatar?: Express.Multer.File;
}

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    private authService: AuthService,
  ) {}

  async getProfile(userId: string) {
    const userProfile = await this.userProfileRepository.findOneBy({
      id: userId,
    });

    return userProfile;
  }

  async registerProfile(userId: string, createProfileDto: CreateProfileDto) {
    const profileUser = await this.authService.findUserById(userId);

    if (!profileUser) {
      throw new Error('User not found');
    }

    const newProfile = this.userProfileRepository.create({
      user: profileUser,
      ...createProfileDto,
    });

    return this.userProfileRepository.save(newProfile);
  }

  async updateProfile({ userId, profileData, avatar }: UpdateProfileOptions) {
    const updatePayload: Partial<UserProfile> = { ...profileData };

    if (avatar) {
      const { mimetype } = avatar;
      const uploadPath = `uploads/avatars/${Date.now()}.${mimetype.split('/')[1]}`;

      await promises.writeFile(uploadPath, avatar.buffer);

      updatePayload.avatarUrl = uploadPath;
    }

    const updatedProfile = await this.userProfileRepository.update(
      { id: userId },
      updatePayload,
    );

    return updatedProfile;
  }
}
