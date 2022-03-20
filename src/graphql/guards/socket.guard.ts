import { ISocketAuth } from '@context/socket.context';
import { User } from '@enities/user.entity';
import { verify } from 'jsonwebtoken';

export const socketGuard = async (ctx: ISocketAuth) => {
  const splittedToken = (ctx.connectionParams!.token as string).split(' ');
  const authType = splittedToken[0].toLocaleLowerCase();
  // Check Auth Type
  if (authType !== 'bearer') return false;
  const token = splittedToken[1];
  // Verify Token
  try {
    const payload = verify(token, process.env.SECRET_KEY!);
    ctx.payload = payload as ISocketAuth['payload'];
  } catch (err) {
    return false;
  }
  // Payload null safety
  if (!ctx.payload) {
    return false;
  }
  // Check if permission isn't provided
  // If permisson provided
  const { id } = ctx.payload;
  // Get user info
  const user = await User.createQueryBuilder('u')
    .innerJoinAndSelect('u.role', 'role')
    .where('u.id= :id', { id })
    .getOne();
  // Set to payload
  if (!user) return false;
  ctx.payload = { ...ctx.payload };

  return true;
};
