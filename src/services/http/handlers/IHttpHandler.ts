import { IHttpRequest } from "./IHttpRequest";
import { IHttpResponse } from "./IHttpResponse";

export interface IHttpHandler {
  handle(req: IHttpRequest, res: IHttpResponse): void;
}
