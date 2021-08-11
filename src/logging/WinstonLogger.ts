import { LogLevel } from "./LogLevel";
import * as winston from "winston";
import { Logger } from "./Logger";

export class WinstonLogger extends Logger {
  public readonly logLevel: string;
  private readonly winstonInnerLogger: any;

  constructor(logLevel: string) {
    super();
    this.logLevel = logLevel;

    const levels = Object.keys(LogLevel)
      .filter((val: any) => isNaN(Number(val)) === false)
      .reduce((acc: any, key: any) => ({ ...acc, [LogLevel[key]]: key }), {});

    const format = winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      winston.format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}`
      )
    );

    this.winstonInnerLogger = winston.createLogger({
      level: this.logLevel.toUpperCase().trim(),
      levels,
      transports: [new winston.transports.Console()],
      format,
    });
  }

  public log(level: LogLevel, message: string): void {
    this.winstonInnerLogger.log(LogLevel[level], message);
  }
}
