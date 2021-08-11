import { ILogger } from "../logging/ILogger";
import { IServer } from "../server/IServer";
import { IApp } from "./IApp";

export class App implements IApp {
  public readonly logger: ILogger;
  public readonly server: IServer;

  constructor(logger: ILogger, server: IServer) {
    this.logger = logger;
    this.server = server;
  }

  public async start(): Promise<void> {
    this.logger.debug(`App starting...`);
    await this.server.start();
    this.logger.info(`App started`);

    process.on("SIGINT", async () => {
      await this.stop();
      process.exit();
    });
  }

  public async stop(): Promise<void> {
    this.logger.debug(`App stopping...`);
    await this.server.stop();
    this.logger.info(`App stopped`);
  }
}
