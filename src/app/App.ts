import { injectable, inject } from "tsyringe";
import { ILogger } from "../logger/ILogger";

@injectable()
export class App {
  private readonly _logger: ILogger;

  constructor(@inject("Logger") logger: ILogger) {
    this._logger = logger;
  }

  start(): void {
    this._logger.info("App started");
  }

  stop(): void {
    this._logger.info("App stopped");
  }
}
