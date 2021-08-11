import { IServer } from "./IServer";
import type { Server, IncomingMessage, ServerResponse } from "http";
import { createServer as createHttpServer } from "http";
import { createServer as createHttpsServer } from "https";
import { URL } from "url";
import { ILogger } from "../logging/ILogger";
import { IHandler } from "./handlers/IHandler";

export class HttpServer implements IServer {
  public readonly logger: ILogger;
  public readonly port: number;
  public readonly handlers: IHandler[];
  private _server?: Server;

  constructor(logger: ILogger, port: number, handlers: IHandler[]) {
    this.logger = logger;
    this.port = port;
    this.handlers = handlers;
  }

  public async start(): Promise<void> {
    this.logger.debug(`HttpServer starting...`);
    const middlewares: any = [];
    for (const handler in this.handlers) {
      this.logger.debug(
        `HttpServer initializing handler: ${this.handlers[handler].constructor.name}`
      );
      middlewares.push(await this.handlers[handler].init());
      this.logger.info(
        `HttpServer initialized handler: ${this.handlers[handler].constructor.name}`
      );
    }

    this._server = createHttpServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        let handled = false;
        for (const middleware in middlewares) {
          let goNext = false;
          middlewares[middleware](req, res, () => {
            goNext = true;
          });
          if (goNext) {
            continue;
          } else {
            handled = true;
            break;
          }
        }
        if (!handled) {
          res.writeHead(404).end();
        }
      }
    );

    this._server.listen(this.port);
    this.logger.info(`HttpServer started on port ${this.port}`);
  }

  public async stop(): Promise<void> {
    if (!this._server) return;
    this.logger.debug(`HttpServer stopping...`);
    this._server?.close();
    this._server = undefined;
    this.logger.info(`HttpServer stopped`);
  }
}
