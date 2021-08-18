import { ILogger } from "../logging/ILogger";

import { Server } from "http";
import express, { Request, Response, NextFunction } from "express";
import { Express } from "express";
import { IServer } from "./IServer";

import { IHandler } from "./handlers/IHandler";

export class ExpressServer implements IServer {
  public readonly logger: ILogger;
  public readonly port: number;
  public readonly handlers: IHandler[];
  private _app?: Express;
  private _server?: Server;

  constructor(logger: ILogger, port: number, handlers: IHandler[]) {
    this.logger = logger;
    this.port = port;
    this.handlers = handlers;
  }

  public async start(): Promise<void> {
    this.logger.debug(`ExpressServer starting...`);

    this._app = express();

    const mw = (req: Request, res: Response, next: NextFunction) => {};

    this._app.use(mw);

    for (const handler in this.handlers) {
      this.logger.debug(
        `ExpressServer initializing handler: ${this.handlers[handler].constructor.name}`
      );
      this._app?.use(await this.handlers[handler].init());
      this.logger.info(
        `ExpressServer initialized handler: ${this.handlers[handler].constructor.name}`
      );
    }

    this._server = this._app.listen(this.port);
    this.logger.info(`ExpressServer started on port ${this.port}`);
  }

  public async stop(): Promise<void> {
    if (!this._server) return;
    this.logger.debug(`ExpressServer stopping...`);
    await this._server.close();
    this._server = undefined;
    this.logger.info(`ExpressServer stopped`);
  }
}
