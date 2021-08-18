import { IHttpHandler } from "./IHttpHandler";
import { IHttpRequest } from "./IHttpRequest";
import { IHttpResponse } from "./IHttpResponse";

export class HttpHandler implements IHttpHandler {
  handle(req: IHttpRequest, res: IHttpResponse): void {
    res.send("OK");
  }
}
