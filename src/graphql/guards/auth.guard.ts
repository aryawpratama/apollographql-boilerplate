import { IAuthContext } from '@context/auth.context';
import { User } from '@enities/user.entity';
import { AuthenticationError } from 'apollo-server-errors';
import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { roleGuard } from './role.guard';
import { RoleType } from './role.type';

export const authGuard: AuthChecker<IAuthContext, RoleType> = async (
  { context },
  role
) => {
  const isAuth = context.req.headers['authorization'];
  if (!isAuth) throw new AuthenticationError('Token is not provided');
  const splittedToken = isAuth.split(' ');
  const authType = splittedToken[0].toLocaleLowerCase();
  if (authType !== 'bearer')
    throw new AuthenticationError('Auth type is not valid');
  const token = splittedToken[1];
  const payload = verify(token, process.env.SECRET_KEY!);
  context.payload = payload as IAuthContext['payload'];
  const { id } = context.payload;
  const user = await User.createQueryBuilder('u')
    .innerJoinAndSelect('u.role', 'role')
    .where('u.id= :id', { id })
    .getOne();
  if (!user) throw new AuthenticationError('User is not registered');
  context.payload = { ...context.payload, user };

  return roleGuard(user, role);
};
