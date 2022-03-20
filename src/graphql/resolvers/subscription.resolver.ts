import { IAuthContext } from '@context/auth.context';
import { ISocketAuth } from '@context/socket.context';
import { User } from '@enities/user.entity';
import { RoleType } from '@guards/role.type';
import {
  Authorized,
  Ctx,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';

@Resolver()
export class SubscriptionResolver {
  @Authorized<RoleType>()
  @Query(() => String)
  async testSubs(
    @Ctx() { payload: { user } }: IAuthContext,
    @PubSub() pubSub: PubSubEngine
  ) {
    pubSub.publish('subscriptionTest', user);

    return 'Subscribtion Triggered';
  }

  @Subscription(() => User, {
    topics: 'subscriptionTest',
    filter: ({ context, payload }: { context: ISocketAuth; payload: User }) =>
      context.payload.id === payload.id,
  })
  async subscriptionTest(@Root() payload: User) {
    return payload;
  }
}
