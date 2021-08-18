import { IService } from "./IService";
import { ILogger } from "../logging/ILogger";

export class VoidService implements IService {
  public readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async start(): Promise<void> {
    this.logger.info("VoidService started");
  }
  async stop(): Promise<void> {
    this.logger.info("VoidService stopped");
  }
}
