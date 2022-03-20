import { User } from '@enities/user.entity';
import { ActionRespond, AuthTokenRespond } from '@object/responds.object';
import { Login, Register } from '@params/auth.param';
import { AuthenticationError } from 'apollo-server-errors';
import { compare } from 'bcryptjs';
import { createRefreshToken, createToken } from '@helpers/auth.helper';
import { Args, Mutation, Resolver } from 'type-graphql';
import { GraphQLError } from 'graphql';
import { Role } from '@enities/role.entity';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthTokenRespond)
  async login(@Args() loginData: Login): Promise<AuthTokenRespond> {
    const { email, password } = loginData;
    const user = await User.createQueryBuilder('u')
      .where('u.email= :email', { email })
      .getOne();
    if (!user) throw new AuthenticationError('User is not registered');
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError("Password doesn't match");
    }
    const token = createToken(user);
    const refreshToken = createRefreshToken(user);

    return { status: 'success', token, refreshToken };
  }

  @Mutation(() => ActionRespond)
  async register(@Args() registData: Register): Promise<ActionRespond> {
    const role = await Role.findOne({ where: { name: 'User' } });
    if (!role) throw new GraphQLError('Role is not found');
    await User.create({ ...registData, role }).save();

    return {
      status: 'succes',
      msg: 'Account registered successfully',
    };
  }
}
