import { User } from '@enities/user.entity';
import { Request, Response } from 'express';

export interface IAuthContext {
  req: Request;
  res: Response;
  payload: {
    id: number;
    user: User;
  };
}
