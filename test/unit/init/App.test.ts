import { App } from "../../../src/init/App";
import { ILogger } from "../../../src/logging/ILogger";
import { Logger } from "../../../src/logging/Logger";
import { IService } from "../../../src/services/IService";
import { Service } from "../../../src/services/Service";
import { LogLevel } from "../../../src/logging/LogLevel";

describe("App", (): void => {
  let app: App;
  let logger: ILogger;
  let services: IService[];

  beforeEach(
    async (): Promise<void> => {
      logger = new Logger(LogLevel[LogLevel.DEBUG]);
      services = [new Service()];
      app = new App(logger, services);
      jest.spyOn(services[0], "start");
      jest.spyOn(services[0], "stop");
    }
  );

  afterEach(
    async (): Promise<void> => {
      await app.stop();
    }
  );

  it("can start", async (): Promise<void> => {
    await app.start();
    expect(services[0].start).toHaveBeenCalledTimes(1);
  });

  it("can stop", async (): Promise<void> => {
    await app.start();
    await app.stop();
    expect(services[0].stop).toHaveBeenCalledTimes(1);
  });

  it("can restart", async (): Promise<void> => {
    await app.restart();
    expect(services[0].start).toHaveBeenCalledTimes(1);
    expect(services[0].stop).toHaveBeenCalledTimes(1);
  });

  it("can start, then restart", async (): Promise<void> => {
    await app.start();
    await app.restart();
    expect(services[0].start).toHaveBeenCalledTimes(2);
    expect(services[0].stop).toHaveBeenCalledTimes(1);
  });
});
