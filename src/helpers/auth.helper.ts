import { User } from '@enities/user.entity';
import { sign } from 'jsonwebtoken';

export const createToken = (user: User) => {
  const { id } = user;

  return sign({ id }, process.env.SECRET_KEY!, { expiresIn: '1d' });
};

export const createRefreshToken = (user: User) => {
  const { id } = user;

  return sign({ id }, process.env.REFRESH_SECRET_KEY!, { expiresIn: '1d' });
};
