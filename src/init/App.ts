import { IApp } from "./IApp";
import { ILogger } from "../logging/ILogger";
import { IService } from "../services/IService";

export enum AppStatus {
  STOPPED,
  STARTED,
}

export class App implements IApp {
  private _status: AppStatus;
  public readonly _logger: ILogger;
  public readonly _services: IService[];

  constructor(logger: ILogger, services: IService[]) {
    this._logger = logger;
    this._services = services;
    this._status = AppStatus.STOPPED;
  }

  public async start(): Promise<void> {
    this._logger.debug(`App starting...`);
    for (const service of this._services) {
      this._logger.debug(`Starting ${service.constructor.name}...`);
      await service.start();
      this._logger.info(`Started ${service.constructor.name}`);
    }
    this._logger.info(`App started`);
    this._status = AppStatus.STARTED;
  }

  public async stop(): Promise<void> {
    this._logger.debug(`App stopping...`);
    for (const service of this._services.reverse()) {
      this._logger.debug(`Stopping ${service.constructor.name}...`);
      await service.stop();
      this._logger.info(`Stopped ${service.constructor.name}`);
    }
    this._logger.info(`App stopped`);
    this._status = AppStatus.STOPPED;
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  public async status(): Promise<AppStatus> {
    return this._status;
  }
}
