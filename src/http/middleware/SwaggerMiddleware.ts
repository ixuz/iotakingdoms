import "reflect-metadata";
import { Router, IRouter } from "express";
import { RegisterRoutes } from "../../generated/routes";
import { setup, serve, JsonObject } from "swagger-ui-express";
import { injectable, inject } from "tsyringe";
import { IMiddleware } from "./IMiddleware";

@injectable()
export class SwaggerMiddleware implements IMiddleware {
  private readonly _swaggerBaseUrl: string;
  private readonly _swaggerDocument: JsonObject;
  private readonly _router: Router;

  constructor(
    @inject("http:middleware:SwaggerBaseUrl") swaggerBaseUrl: string,
    @inject("http:middleware:SwaggerDocument") swaggerDocument: JsonObject
  ) {
    this._swaggerBaseUrl = swaggerBaseUrl;
    this._swaggerDocument = swaggerDocument;
    this._router = Router();
    RegisterRoutes(this._router);
    this._router.use(this._swaggerBaseUrl, serve);
    this._router.get(this._swaggerBaseUrl, setup(this._swaggerDocument));
  }

  router(): IRouter {
    return this._router;
  }
}
