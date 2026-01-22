import { setSeederFactory } from 'typeorm-extension';
import { Category } from '../../categories/entities/category.entity';

export default setSeederFactory(Category, (faker) => {
  const category = new Category();
  category.title = faker.lorem.words(3);
  category.description = faker.lorem.sentence();
  category.coverImageUrl = faker.image.url();

  return category;
});
