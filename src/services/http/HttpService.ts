import { ILogger } from "../../logging/ILogger";
import { IService } from "../../common/IService";
import { IHttpHandler } from "./IHttpHandler";

export class HttpService implements IService {
  public readonly logger: ILogger;
  public readonly handlers: IHttpHandler[];

  constructor(logger: ILogger, handlers: IHttpHandler[]) {
    this.logger = logger;
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
