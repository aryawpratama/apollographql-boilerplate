import { GraphQLError } from 'graphql';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';

let pubsub: PubSubEngine | null = null;
export const createPubsub = () => {
  pubsub = new PubSub() as PubSubEngine;
};
export const getPubSub = () => {
  if (!pubsub) throw new GraphQLError('Pubsub system is not available');

  return pubsub;
};
