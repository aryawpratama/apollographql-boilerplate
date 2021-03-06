import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import colors from 'colors';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createPubsub } from '@helpers/pubsub.helper';
import { socketGuard } from '@guards/socket.guard';
import { ISocketAuth } from '@context/socket.context';
import { logHelper } from '@helpers/log.helper';
import { Context } from 'graphql-ws';
import { schemaHelper } from '@helpers/schema.helper';
// Start Server Function
(async () => {
  logHelper();
  // Create Pubsub
  createPubsub();
  // TypeORM Database Connection
  console.log(
    `[${colors.cyan('INFO')}] ${colors.yellow('Connecting to Database...')}`
  );
  await createConnection();
  console.log(
    `[${colors.cyan('SUCCESS')}] ${colors.green('Database Connected!')}`
  );
  // Apollo Server Express
  const port = process.env.PORT;
  const host = process.env.HOST;
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json());
  // Apollo Schema Generator
  const schema = await schemaHelper();
  // Apollo Server Instance
  const apolloServer = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: context => context,
  });
  console.log(
    `[${colors.cyan('INFO')}] ${colors.yellow('Starting Server...')}`
  );
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  // Start HTTP Server
  httpServer.listen(port, () => {
    // graphql-ws Instance
    const wsServer = new ws.Server({
      server: httpServer,
      path: '/graphql',
    });

    useServer(
      {
        schema,
        onConnect: async (ctx): Promise<boolean> =>
          socketGuard(ctx as ISocketAuth),
        onSubscribe: async (ctx): Promise<void> => {
          await socketGuard(ctx as ISocketAuth);
        },
        onNext: async (ctx): Promise<void> => {
          await socketGuard(ctx as ISocketAuth);
        },
        context: async (ctx): Promise<Context> => ctx,
      },
      wsServer
    );
  });
  console.log(
    `[${colors.cyan('SUCCESS')}] ${colors.green(
      `GraphQL server is running on ${host}:${port}${apolloServer.graphqlPath}`
    )}`
  );
})();
