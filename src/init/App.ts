import { ILogger } from "../logging/ILogger";
import { IService } from "../common/IService";

export class App {
  public readonly logger: ILogger;
  public readonly services: IService[];

  constructor(logger: ILogger, services: IService[]) {
    this.logger = logger;
    this.services = services;
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
