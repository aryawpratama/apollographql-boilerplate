import { User } from '@enities/user.entity';
import { RoleType } from './role.type';

export const roleGuard = (user: User, roleType: RoleType[]): boolean => {
  const { role } = user;
  if (!roleType.length) return true;

  if (roleType.includes(role.name as RoleType)) return true;

  return false;
};
