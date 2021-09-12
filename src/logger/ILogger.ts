import { LogLevel } from "./LogLevel";

export interface ILogger {
  debug(msg: string): void;
  error(msg: string): void;
  warn(msg: string): void;
  info(msg: string): void;
  log(level: LogLevel, msg: string): void;
}
