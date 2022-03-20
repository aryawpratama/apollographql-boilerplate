import { Role } from '@enities/role.entity';
import { roleFactory } from '@factories/role.factory';
import { Seeder } from 'typeorm-seeding';

export default class RoleSeed implements Seeder {
  public async run(): Promise<void> {
    const role = Role.create(roleFactory);
    await Role.save(role);
  }
}
