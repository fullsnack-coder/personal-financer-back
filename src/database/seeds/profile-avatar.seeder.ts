import { AvatarGroup } from '@/user-profile/entities/avatar-group.entity';
import { ProfileAvatar } from '@/user-profile/entities/profile-avatar.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class ProfileAvatarSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const profileAvatarRepository = dataSource.getRepository(ProfileAvatar);
    const avatarGroupRepository = dataSource.getRepository(AvatarGroup);

    const [firstGroup, secondGroup, thirdGroup] =
      await avatarGroupRepository.find();

    await profileAvatarRepository.save([
      {
        group: firstGroup,
        url: 'https://i.imgur.com/3Enqg6V.png',
      },
      {
        group: secondGroup,
        url: 'https://i.imgur.com/bVQRR6D.png',
      },
      {
        group: thirdGroup,
        url: 'https://i.imgur.com/pggITa9.png',
      },
    ]);
  }
}
