import { ILogger } from "../../logging/ILogger";
import { Service, ServiceStatus } from "../Service";
import { IHttpHandler } from "./handlers/IHttpHandler";
import express, { Express } from "express";
import { Server } from "http";

export class ExpressService extends Service {
  public readonly _logger: ILogger;
  public readonly _port: number;
  public readonly _handlers: IHttpHandler[];
  public readonly _app: Express;
  private _server: Server | undefined;

  constructor(logger: ILogger, port: number, handlers: IHttpHandler[]) {
    super();
    this._logger = logger;
    this._port = port;
    this._handlers = handlers;
    this._app = express();
    this._server = undefined;
  }

  public async start(): Promise<void> {
    this._handlers.forEach(this.attachHandler);
    this._server = this._app.listen(this._port);
    this._logger.info(`ExpressService listening on port ${this._port}`);
    this._status = ServiceStatus.STARTED;
  }

  public async stop(): Promise<void> {
    if (this._server) this._server.close();
    this._server = undefined;
    this._status = ServiceStatus.STOPPED;
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  public attachHandler = (handler: IHttpHandler) =>
    this._app.use(handler.handle);
}
