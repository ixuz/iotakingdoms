import { ILogger } from "../../logging/ILogger";
import { Service } from "../Service";
import { IHttpHandler } from "./IHttpHandler";
import { Status } from "../Status";
import Http from "http";

export class HttpService extends Service {
  public readonly logger: ILogger;
  public readonly handlers: IHttpHandler[];
  public readonly server: Http.Server;

  constructor(logger: ILogger, handlers: IHttpHandler[]) {
    super();
    this.logger = logger;
    this.handlers = handlers;
    this.server = Http.createServer();
  }

  public async start(): Promise<void> {
    this.logger.debug(`HttpService starting...`);
    this.server.listen(3000);
    this.logger.info(`HttpService started`);
    this._status = Status.STARTED;
  }

  public async stop(): Promise<void> {
    this.logger.debug(`HttpService stopping...`);
    this.server.close();
    this.logger.info(`HttpService stopped`);
    this._status = Status.STOPPED;
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }
}
