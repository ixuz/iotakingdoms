import { ILogger } from "../../logging/ILogger";
import { IHandler } from "./IHandler";

export class LogHandler implements IHandler {
  public readonly logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async init(): Promise<any> {
    return (req: any, res: any, next: any) => {
      const { method, url } = req;
      this.logger.debug(`Handle request [method="${method}" path="${url}"]`);
      next();
    };
  }
}
