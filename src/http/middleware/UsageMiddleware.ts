import "reflect-metadata";
import { Router, IRouter, Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";
import { ILogger } from "../../logger/ILogger";
import { IMiddleware } from "./IMiddleware";

@injectable()
export class UsageMiddleware implements IMiddleware {
  private readonly _logger: ILogger;
  private readonly _router: Router;

  constructor(@inject("Logger") logger: ILogger) {
    this._logger = logger;
    this._router = Router();
    this._router.use("/", (req: Request, res: Response, next: NextFunction) => {
      this._logger.debug(
        `method=${req.method} path=${req.path} host=${req.hostname} protocol=${req.protocol} status=${res.statusCode}`
      );
      next();
    });
  }

  router(): IRouter {
    return this._router;
  }
}
