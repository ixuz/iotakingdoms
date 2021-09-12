import { injectable, inject } from "tsyringe";
import { ILogger } from "../logger/ILogger";
import { IHttpServer } from "../http/IHttpServer";

@injectable()
export class App {
  private readonly _logger: ILogger;
  private readonly _httpServer: IHttpServer;

  constructor(
    @inject("Logger") logger: ILogger,
    @inject("http:HttpServer") httpServer: IHttpServer
  ) {
    this._logger = logger;
    this._httpServer = httpServer;
  }

  async start(): Promise<void> {
    await this._httpServer.start();
    this._logger.info("App started");
  }

  async stop(): Promise<void> {
    await this._httpServer.stop();
    this._logger.info("App stopped");
  }
}
