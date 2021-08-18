import { LogLevel } from "./LogLevel";

export class Logger {
  public readonly logLevel: string;

  constructor(logLevel: string) {
    this.logLevel = logLevel;
  }

  public error(message: string): boolean {
    if (this.shouldLog(LogLevel.ERROR)) return false;
    this.log(LogLevel.ERROR, message);
    return true;
  }

  public warn(message: string): boolean {
    if (this.shouldLog(LogLevel.WARN)) return false;
    this.log(LogLevel.WARN, message);
    return true;
  }

  public info(message: string): boolean {
    if (this.shouldLog(LogLevel.INFO)) return false;
    this.log(LogLevel.INFO, message);
    return true;
  }

  public debug(message: string): boolean {
    if (this.shouldLog(LogLevel.DEBUG)) return false;
    this.log(LogLevel.DEBUG, message);
    return true;
  }

  public log(level: LogLevel, message: string): void {
    // NOP
  }

  private shouldLog(level: LogLevel): boolean {
    return level > LogLevel[this.logLevel as keyof typeof LogLevel];
  }
}
