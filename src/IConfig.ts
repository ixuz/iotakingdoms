import { LogLevel } from "./LogLevel";

export interface IConfig {
  logLevel(): LogLevel;
}
