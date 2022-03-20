import { User } from '@enities/user.entity';
import { Context } from 'graphql-ws';

export interface ISocketAuth extends Context {
  payload: {
    id: number;
    user: User;
  };
}
