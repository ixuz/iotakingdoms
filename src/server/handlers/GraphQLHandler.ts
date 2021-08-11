import { ILogger } from "../../logging/ILogger";

import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { UserResolver } from "../resolvers/UserResolver";
import { IHandler } from "./IHandler";

export class GraphQLHandler implements IHandler {
  public readonly logger: ILogger;
  private _apolloServer?: ApolloServer;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async init(): Promise<any> {
    await createConnection();

    this._apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    await this._apolloServer.start();

    return this._apolloServer.getMiddleware();
  }
}
