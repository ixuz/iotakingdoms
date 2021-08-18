import { ILogger } from "../logging/ILogger";
import { IService } from "../services/IService";

export class App {
  public readonly logger: ILogger;
  public readonly services: IService[];

  constructor(logger: ILogger, services: IService[]) {
    this.logger = logger;
    this.services = services;
  }

  public async start(): Promise<void> {
    this.logger.debug(`App starting...`);
    for (const service of this.services) {
      this.logger.debug(`Starting ${service.constructor.name}...`);
      await service.start();
      this.logger.info(`Started ${service.constructor.name}`);
    }
    this.logger.info(`App started`);
  }

  public async stop(): Promise<void> {
    this.logger.debug(`App stopping...`);
    for (const service of this.services.reverse()) {
      this.logger.debug(`Stopping ${service.constructor.name}...`);
      await service.stop();
      this.logger.info(`Stopped ${service.constructor.name}`);
    }
    this.logger.info(`App stopped`);
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }
}
