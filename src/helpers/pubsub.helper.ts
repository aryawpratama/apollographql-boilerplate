import { ValidationError } from 'apollo-server-errors';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';

let pubsub: PubSubEngine | null = null;
export const createPubsub = () => {
  pubsub = new PubSub() as PubSubEngine;
};
export const getPubSub = () => {
  if (!pubsub) throw new ValidationError('Pubsub system is not available');

  return pubsub;
};
