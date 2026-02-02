import { AvatarGroup } from '@/user-profile/entities/avatar-group.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class AvatarGroupSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const avatarGroupRepository = dataSource.getRepository(AvatarGroup);

    await avatarGroupRepository.save([
      { groupName: 'Men' },
      { groupName: 'Women' },
      { groupName: 'Animals' },
    ]);
  }
}
