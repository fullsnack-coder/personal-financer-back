import UserProfile from '@/user-profile/entities/user-profile.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserProfile, (faker) => {
  const userProfile = new UserProfile();

  userProfile.firstName = faker.person.firstName();
  userProfile.lastName = faker.person.lastName();
  userProfile.bio = faker.lorem.sentence();

  return userProfile;
});
