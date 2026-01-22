import { setSeederFactory } from 'typeorm-extension';
import { Fund } from '../../funds/entities/fund.entity';

export default setSeederFactory(Fund, (faker) => {
  const fund = new Fund();

  fund.title = faker.lorem.words(2);
  fund.description = faker.lorem.sentence();
  fund.balance = faker.number.float({ min: 0, max: 10000, fractionDigits: 2 });

  return fund;
});
