import { ILogger } from "../logging/ILogger";
import { IServer } from "../server/IServer";
import { Service } from "../common/Service";
import { IService } from "../common/IService";
import { IHttpHandler } from "./IHttpHandler";

export class HttpService extends Service {
  public readonly handlers: IHttpHandler[];

  constructor(logger: ILogger, services: IService[], handlers: IHttpHandler[]) {
    super(logger, services);
    this.handlers = handlers;
  }

  public async start(): Promise<void> {
    this.logger.debug(`App starting...`);
    this.logger.info(`App started`);
  }

  public async stop(): Promise<void> {
    this.logger.debug(`App stopping...`);
    this.logger.info(`App stopped`);
  }
}
