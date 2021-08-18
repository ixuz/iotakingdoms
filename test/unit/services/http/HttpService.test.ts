import { HttpService } from "../../../../src/services/http/HttpService";
import { LogLevel } from "../../../../src/logging/LogLevel";
import { Status } from "../../../../src/services/Status";
import { Logger } from "../../../../src/logging/Logger";

describe("HttpService", (): void => {
  it("should start, restart and stop the service", async (): Promise<void> => {
    const httpService = new HttpService(
      new Logger(LogLevel[LogLevel.DEBUG]),
      []
    );
    jest.spyOn(httpService, "start");
    jest.spyOn(httpService, "stop");
    jest.spyOn(httpService, "restart");
    expect(await httpService.status()).toBe(Status.STOPPED);
    await httpService.start();
    expect(await httpService.status()).toBe(Status.STARTED);
    await httpService.restart();
    expect(await httpService.status()).toBe(Status.STARTED);
    await httpService.stop();
    expect(await httpService.status()).toBe(Status.STOPPED);
    expect(httpService.start).toHaveBeenCalledTimes(2);
    expect(httpService.stop).toHaveBeenCalledTimes(2);
    expect(httpService.restart).toHaveBeenCalledTimes(1);
  });
});
