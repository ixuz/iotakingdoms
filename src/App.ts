import { injectable, inject } from "tsyringe";
import { ILogger } from "./ILogger";
import { LogLevel } from "./LogLevel";

@injectable()
export class App {
  private readonly logger: ILogger;

  constructor(@inject("ILogger") logger: ILogger) {
    this.logger = logger;
  }

  start(): void {
    this.logger.log(LogLevel.INFO, "App started");
  }

  stop(): void {
    this.logger.log(LogLevel.INFO, "App stopped");
  }
}
