import { fastify, FastifyInstance } from "fastify";
import middie from "middie";
import { IServer } from "./IServer";
import { ILogger } from "../logging/ILogger";
import { IncomingMessage, ServerResponse } from "http";
import { IHandler } from "./handlers/IHandler";

export class FastifyServer implements IServer {
  public readonly logger: ILogger;
  public readonly port: number;
  public readonly handlers: IHandler[];
  private _app?: FastifyInstance;

  constructor(logger: ILogger, port: number, handlers: IHandler[]) {
    this.logger = logger;
    this.port = port;
    this.handlers = handlers;
  }

  public async start(): Promise<void> {
    this.logger.debug(`FastifyServer starting...`);

    this._app = fastify();
    await this._app.register(middie);

    this._app.use((req: IncomingMessage, res: ServerResponse, next: any) => {
      const { method, url } = req;
      this.logger.debug(`Handle request [method="${method}" path="${url}"]`);
      next();
    });

    for (const handler in this.handlers) {
      this.logger.debug(
        `FastifyServer initializing handler: ${this.handlers[handler].constructor.name}`
      );
      this._app?.use(await this.handlers[handler].init());
      this.logger.info(
        `FastifyServer initialized handler: ${this.handlers[handler].constructor.name}`
      );
    }

    await this._app.listen(this.port);
    this.logger.info(`FastifyServer started on port ${this.port}`);
  }

  public async stop(): Promise<void> {
    if (!this._app) return;
    this.logger.debug(`FastifyServer stopping...`);
    this._app?.close();
    this._app = undefined;
    this.logger.info(`FastifyServer stopped`);
  }
}
