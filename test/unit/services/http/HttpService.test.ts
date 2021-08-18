import { HttpService } from "../../../../src/services/http/HttpService";
import { LogLevel } from "../../../../src/logging/LogLevel";
import { Logger } from "../../../../src/logging/Logger";
import { ServiceStatus } from "../../../../src/services/Service";

describe("HttpService", (): void => {
  it("should start, restart and stop the service", async (): Promise<void> => {
    const httpService = new HttpService(
      new Logger(LogLevel[LogLevel.DEBUG]),
      3000,
      []
    );
    jest.spyOn(httpService, "start");
    jest.spyOn(httpService, "stop");
    jest.spyOn(httpService, "restart");
    expect(await httpService.status()).toBe(ServiceStatus.STOPPED);
    await httpService.start();
    expect(await httpService.status()).toBe(ServiceStatus.STARTED);
    await httpService.restart();
    expect(await httpService.status()).toBe(ServiceStatus.STARTED);
    await httpService.stop();
    expect(await httpService.status()).toBe(ServiceStatus.STOPPED);
    expect(httpService.start).toHaveBeenCalledTimes(2);
    expect(httpService.stop).toHaveBeenCalledTimes(2);
    expect(httpService.restart).toHaveBeenCalledTimes(1);
  });
});
