import { ILogger } from "./ILogger";
import { injectable, inject } from "tsyringe";
import { IConfig } from "./IConfig";
import { LogLevel } from "./LogLevel";

@injectable()
export class Logger implements ILogger {
  private readonly config: IConfig;
  constructor(@inject("IConfig") config: IConfig) {
    this.config = config;
  }

  debug(msg: string): void {
    if (!this.checkLogLevel(LogLevel.DEBUG)) return;
    this.log(LogLevel.DEBUG, msg);
  }

  error(msg: string): void {
    if (!this.checkLogLevel(LogLevel.ERROR)) return;
    this.log(LogLevel.ERROR, msg);
  }

  warn(msg: string): void {
    if (!this.checkLogLevel(LogLevel.WARN)) return;
    this.log(LogLevel.WARN, msg);
  }

  info(msg: string): void {
    if (!this.checkLogLevel(LogLevel.INFO)) return;
    this.log(LogLevel.INFO, msg);
  }

  log(level: LogLevel, msg: string): void {
    console.log(`[${LogLevel[level]}]: ${msg}`);
  }

  checkLogLevel(level: LogLevel): boolean {
    return level <= this.config.logLevel();
  }
}
