import { ILogger } from "../../logging/ILogger";
import { Service, ServiceStatus } from "../Service";
import { IHttpHandler } from "./IHttpHandler";
import Http from "http";

export class HttpService extends Service {
  public readonly logger: ILogger;
  public readonly port: number;
  public readonly handlers: IHttpHandler[];
  public readonly server: Http.Server;

  constructor(logger: ILogger, port: number, handlers: IHttpHandler[]) {
    super();
    this.logger = logger;
    this.port = port;
    this.handlers = handlers;
    this.server = Http.createServer();
  }

  public async start(): Promise<void> {
    this.logger.debug(`HttpService starting...`);
    this.server.listen(this.port);
    this.logger.info(`HttpService started at port ${this.port}`);
    this._status = ServiceStatus.STARTED;
  }

  public async stop(): Promise<void> {
    this.logger.debug(`HttpService stopping...`);
    this.server.close();
    this.logger.info(`HttpService stopped`);
    this._status = ServiceStatus.STOPPED;
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }
}
