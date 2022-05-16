import { authGuard } from '@guards/auth.guard';
import path from 'path';
import { buildSchema, NonEmptyArray, PubSubEngine } from 'type-graphql';
import { getPubSub } from './pubsub.helper';
import { requireAll } from './require.helper';

export const schemaHelper = async () => {
let customResolvers = requireAll(path.join(__dirname, '../graphql/resolvers'));

customResolvers = Object.values(customResolvers).map(
  (val) => Object.values(val)[0]
);

return buildSchema({
    resolvers: customResolvers as NonEmptyArray<string>,
    authChecker: authGuard,
    pubSub: getPubSub() as PubSubEngine,
  });
};
schemaHelper();
