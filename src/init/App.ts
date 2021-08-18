import { ILogger } from "../logging/ILogger";
import { IServer } from "../server/IServer";
import { Service } from "../common/Service";
import { IService } from "../common/IService";

export class App extends Service {
  public readonly server: IServer;

  constructor(logger: ILogger, services: IService[], server: IServer) {
    super(logger, services);
    this.server = server;
  }

  public async start(): Promise<void> {
    this.logger.debug(`App starting...`);
    await this.server.start();
    this.logger.info(`App started`);
  }

  public async stop(): Promise<void> {
    this.logger.debug(`App stopping...`);
    await this.server.stop();
    this.logger.info(`App stopped`);
  }
}
