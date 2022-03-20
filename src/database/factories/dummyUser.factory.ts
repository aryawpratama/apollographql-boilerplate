import { User } from '@enities/user.entity';
import { define } from 'typeorm-seeding';
import faker from 'faker/locale/id_ID';

define(User, () => {
  const user = new User();
  user.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  user.email = faker.internet.email();
  user.phone = faker.phone.phoneNumber();
  user.password = '12345678';

  return user;
});
