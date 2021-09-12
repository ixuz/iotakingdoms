import { injectable, inject } from "tsyringe";
import { ILogger } from "./ILogger";

@injectable()
export class App {
  private readonly logger: ILogger;

  constructor(@inject("ILogger") logger: ILogger) {
    this.logger = logger;
  }

  start(): void {
    this.logger.info("App started");
  }

  stop(): void {
    this.logger.info("App stopped");
  }
}
