import { IHttpServer } from "./IHttpServer";
import express from "express";
import { inject, injectable } from "tsyringe";
import { Server } from "http";
import { ILogger } from "../logger/ILogger";
import { IMiddleware } from "./middleware/IMiddleware";

@injectable()
export class HttpServer implements IHttpServer {
  private readonly _logger: ILogger;
  private readonly _port: number;
  private readonly _usageMiddleware: IMiddleware;
  private readonly _swaggerMiddleware: IMiddleware;
  private _server: Server | null;

  constructor(
    @inject("Logger") logger: ILogger,
    @inject("http:Port") port: number,
    @inject("http:middleware:UsageMiddleware") usageMiddleware: IMiddleware,
    @inject("http:middleware:SwaggerMiddleware") swaggerMiddleware: IMiddleware
  ) {
    this._logger = logger;
    this._port = port;
    this._usageMiddleware = usageMiddleware;
    this._swaggerMiddleware = swaggerMiddleware;
    this._server = null;
  }

  async start(): Promise<void> {
    const app = express();

    app.use(this._usageMiddleware.router());
    app.use("/", this._swaggerMiddleware.router());

    this._server = app.listen(this._port);

    this._logger.info(`HttpServer started at http://localhost:${this._port}`);
  }

  async stop(): Promise<void> {
    if (this._server) {
      this._server.close();
      this._logger.info("HttpServer stopped");
    }
  }
}
