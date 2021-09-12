import { ILogger } from "./ILogger";
import { injectable } from "tsyringe";
import { LogLevel } from "./LogLevel";

@injectable()
export class VoidLogger implements ILogger {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  debug(msg: string): void {
    // Do nothing
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  error(msg: string): void {
    // Do nothing
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  warn(msg: string): void {
    // Do nothing
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  info(msg: string): void {
    // Do nothing
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  log(level: LogLevel, msg: string): void {
    // Do nothing
  }
}
