import { Role } from '@enities/role.entity';
import { User } from '@enities/user.entity';
import { specialUserFactory } from '@factories/specialUser.factory';
import { factory, Seeder } from 'typeorm-seeding';

export default class RoleSeed implements Seeder {
  public async run(): Promise<void> {
    const role = await Role.find();
    const userData = specialUserFactory.map((val, idx) => ({
      ...val,
      role: role.find(r => r.id === idx + 1),
    }));
    const users = User.create(userData);
    await User.save(users);
    const dummyUser = await factory(User)()
      .map(async user => {
        user.role = role.find(r => r.id === 3)!;

        return user;
      })
      .createMany(20);
    await User.save(dummyUser);
  }
}
