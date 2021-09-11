import { IConfig } from "./IConfig";
import { inject, injectable } from "tsyringe";
import { LogLevel } from "./LogLevel";

@injectable()
export class Config implements IConfig {
  readonly _logLevel: LogLevel;

  constructor(@inject("LogLevel") logLevel: LogLevel) {
    this._logLevel = logLevel;
  }

  logLevel(): LogLevel {
    return this._logLevel;
  }
}
