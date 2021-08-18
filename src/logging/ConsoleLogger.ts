import { LogLevel } from "./LogLevel";
import { Logger } from "./Logger";

export class ConsoleLogger extends Logger {
  constructor(logLevel: string) {
    super(logLevel);
  }

  public log(level: LogLevel, message: string): void {
    const methods = {
      [LogLevel.ERROR]: console.error,
      [LogLevel.WARN]: console.warn,
      [LogLevel.INFO]: console.info,
      [LogLevel.DEBUG]: console.debug,
    };

    const format = `${new Date().toISOString()} [${
      LogLevel[level]
    }]: ${message}`;

    methods[level as keyof typeof methods](format);
  }
}
