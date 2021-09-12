import { IConfig } from "./IConfig";
import { inject, injectable } from "tsyringe";
import { LogLevel } from "../logger/LogLevel";

@injectable()
export class Config implements IConfig {
  readonly _logLevel: LogLevel;
  readonly _port: number;

  constructor(
    @inject("LogLevel") logLevel: LogLevel,
    @inject("http:Port") port: number
  ) {
    this._logLevel = logLevel;
    this._port = port;
  }

  logLevel(): LogLevel {
    return this._logLevel;
  }

  port(): LogLevel {
    return this._port;
  }
}
