import { LogLevel } from "./LogLevel";
import { Logger } from "./Logger";

export class ConsoleLogger extends Logger {
  public readonly logLevel: string;

  constructor(logLevel: string) {
    super();
    this.logLevel = logLevel;
  }

  public log(level: LogLevel, message: string): void {
    if (level > LogLevel[this.logLevel as keyof typeof LogLevel]) return;

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
