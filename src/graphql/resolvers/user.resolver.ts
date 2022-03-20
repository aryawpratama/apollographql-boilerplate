import {
  Query,
  Resolver,
  Authorized,
  Mutation,
  Args,
  Ctx,
  Arg,
} from 'type-graphql';
import { RoleType } from '@guards/role.type';
import { User } from '@enities/user.entity';
import { ActionRespond } from '@object/responds.object';
import { CreateUser, UpdateProfile, UpdateUser } from '@params/user.param';
import { Role } from '@enities/role.entity';
import { IAuthContext } from '@context/auth.context';
import { ValidationError } from 'apollo-server-errors';

@Resolver()
export class UserResolver {
  @Authorized<RoleType>()
  @Query(() => User)
  async profileInfo(@Ctx() { payload: { user } }: IAuthContext): Promise<User> {
    return user;
  }

  @Authorized<RoleType>()
  @Mutation(() => ActionRespond)
  async updateProfile(
    @Args() data: UpdateProfile,
    @Ctx() { payload: { user } }: IAuthContext
  ): Promise<ActionRespond> {
    await User.update(user!, { ...data });

    return { status: 'success', msg: 'Account Updated', data: `${user.id}` };
  }

  @Authorized<RoleType>(['Organizer', 'Admin'])
  @Mutation(() => ActionRespond)
  async deleteProfile(
    @Ctx() { payload: { user } }: IAuthContext
  ): Promise<ActionRespond> {
    await User.softRemove(user);

    return { status: 'success', msg: 'Profile deleted', data: `${user.id}` };
  }

  @Authorized<RoleType>(['Admin'])
  @Query(() => [User])
  async users(): Promise<User[]> {
    const user = await User.find({ relations: ['role'] });

    return user;
  }

  @Authorized<RoleType>(['Admin'])
  @Mutation(() => ActionRespond)
  async createUser(@Args() data: CreateUser): Promise<ActionRespond> {
    const { roleId } = data;
    const role = await Role.findOne({ where: { id: roleId } });
    const user = await User.create({ ...data, role }).save();

    return { status: 'success', msg: 'Account Created', data: `${user.id}` };
  }

  @Authorized<RoleType>(['Organizer', 'Admin'])
  @Mutation(() => ActionRespond)
  async updateUser(
    @Args() data: UpdateUser,
    @Ctx() { payload: { user } }: IAuthContext
  ): Promise<ActionRespond> {
    const { id } = data;
    const target = await User.findOne({ where: { id } });
    if (!target) throw new ValidationError('User not found');
    if (target.role.id < user.role.id) {
      throw new ValidationError('Unable to update higher role');
    }
    await User.update(target, { ...data });

    return { status: 'success', msg: 'Account Updated', data: `${target.id}` };
  }

  @Authorized<RoleType>(['Organizer', 'Admin'])
  @Mutation(() => ActionRespond)
  async deleteUser(
    @Arg('id') id: number,
    @Ctx() { payload: { user } }: IAuthContext
  ): Promise<ActionRespond> {
    const target = await User.findOne({ where: { id }, relations: ['role'] });
    if (!target) throw new ValidationError('User not found');
    if (target.role.id < user.role.id) {
      throw new ValidationError('Unable to delete higher role');
    }
    await User.softRemove(target);

    return { status: 'success', msg: 'Account deleted', data: `${target.id}` };
  }
}
