import { LogLevel } from "./LogLevel";

export abstract class Logger {
  public abstract log(level: LogLevel, message: string): void;

  public error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  public warn(message: string): void {
    this.log(LogLevel.WARN, message);
  }

  public info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  public debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }
}
