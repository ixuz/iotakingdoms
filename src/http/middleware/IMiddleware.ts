import { IRouter } from "express";

export interface IMiddleware {
  router(): IRouter;
}
