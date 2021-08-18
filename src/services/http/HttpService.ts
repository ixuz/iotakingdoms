import { ILogger } from "../../logging/ILogger";
import { Service, ServiceStatus } from "../Service";
import { IHttpHandler } from "./handlers/IHttpHandler";
import Http from "http";

export class HttpService extends Service {
  public readonly _logger: ILogger;
  public readonly _port: number;
  public readonly _handlers: IHttpHandler[];
  public readonly _server: Http.Server;

  constructor(logger: ILogger, port: number, handlers: IHttpHandler[]) {
    super();
    this._logger = logger;
    this._port = port;
    this._handlers = handlers;
    this._server = Http.createServer();
  }

  public async start(): Promise<void> {
    this._server.listen(this._port);
    this._logger.info(`HttpService listening on port ${this._port}`);
    this._status = ServiceStatus.STARTED;
  }

  public async stop(): Promise<void> {
    this._server.close();
    this._status = ServiceStatus.STOPPED;
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }
}
