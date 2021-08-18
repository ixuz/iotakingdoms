import { ExpressService } from "../../../../src/services/http/ExpressService";
import { LogLevel } from "../../../../src/logging/LogLevel";
import { Logger } from "../../../../src/logging/Logger";
import { ServiceStatus } from "../../../../src/services/Service";

describe("ExpressService", (): void => {
  it("should start, restart and stop the service", async (): Promise<void> => {
    const expressService = new ExpressService(
      new Logger(LogLevel[LogLevel.DEBUG]),
      3000,
      []
    );
    jest.spyOn(expressService, "start");
    jest.spyOn(expressService, "stop");
    jest.spyOn(expressService, "restart");
    expect(await expressService.status()).toBe(ServiceStatus.STOPPED);
    await expressService.start();
    expect(await expressService.status()).toBe(ServiceStatus.STARTED);
    await expressService.restart();
    expect(await expressService.status()).toBe(ServiceStatus.STARTED);
    await expressService.stop();
    expect(await expressService.status()).toBe(ServiceStatus.STOPPED);
    expect(expressService.start).toHaveBeenCalledTimes(2);
    expect(expressService.stop).toHaveBeenCalledTimes(2);
    expect(expressService.restart).toHaveBeenCalledTimes(1);
  });

  it("should not throw if stop() is called when service is already stopped", async (): Promise<
    void
  > => {
    const expressService = new ExpressService(
      new Logger(LogLevel[LogLevel.DEBUG]),
      3000,
      []
    );
    expect(await expressService.status()).toBe(ServiceStatus.STOPPED);
    await expressService.stop();
    await expressService.start();
    await expressService.stop();
    expect(await expressService.status()).toBe(ServiceStatus.STOPPED);
  });
});
