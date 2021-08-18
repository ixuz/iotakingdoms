import { IService } from "./IService";
import { ILogger } from "../logging/ILogger";

export abstract class Service implements IService {
  public readonly logger: ILogger;
  public readonly services: IService[];

  constructor(logger: ILogger, services: IService[]) {
    this.logger = logger;
    this.services = services;
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
}
