import { LogLevel } from "../logger/LogLevel";

export interface IConfig {
  logLevel(): LogLevel;
  port(): number;
}
