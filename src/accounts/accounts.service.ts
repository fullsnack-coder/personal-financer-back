import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, Repository } from 'typeorm';
import UserDevice from './entities/user-device.entity';
import { ProfilePreferenceKey } from '@/user-profile/utils/profile-preference.enum';
import { mapBooleanToString } from '@/user-profile/utils/map-boolean-to-string';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDevice)
    private userDeviceRepository: Repository<UserDevice>,
  ) {}

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username: Equal(username) });
  }

  findToComparePassword(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username: Equal(username) },
      select: {
        passwordHash: true,
        username: true,
        id: true,
      },
    });
  }

  findUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: Equal(userId) },
      select: {
        passwordHash: false,
      },
    });
  }

  createAccountUser(userData: Partial<User>): Promise<User> {
    const accountUser = this.userRepository.create(userData);
    return accountUser.save();
  }

  registerDeviceToken(userId: string, deviceToken: string) {
    const userDevice = this.userDeviceRepository.create({
      userId,
      deviceToken,
    });

    return this.userDeviceRepository.save(userDevice);
  }

  findUsersWithPushNotificationsEnabled() {
    return this.userRepository.find({
      where: {
        profilePreferences: {
          preferenceKey: Equal(ProfilePreferenceKey.NOTIFICATIONS),
          preferenceValue: Equal(mapBooleanToString(true)),
        },
      },
      relations: ['profilePreferences'],
    });
  }
}
