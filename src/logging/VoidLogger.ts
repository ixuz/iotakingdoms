import { LogLevel } from "./LogLevel";
import { Logger } from "./Logger";

export class VoidLogger extends Logger {
  public readonly logLevel: string;

  constructor(logLevel: string) {
    super();
    this.logLevel = logLevel;
  }

  public log(level: LogLevel, message: string): void {
    return;
  }
}
