import { ConsoleLogger } from "../../../src/logging/ConsoleLogger";
import { Service } from "../../../src/services/Service";
import { LogLevel } from "../../../src/logging/LogLevel";
import { Status } from "../../../src/services/Status";

describe("Service", (): void => {
  it("should start, restart and stop the service", async (): Promise<void> => {
    const service = new Service();
    jest.spyOn(service, "start");
    jest.spyOn(service, "stop");
    jest.spyOn(service, "restart");
    expect(await service.status()).toBe(Status.STOPPED);
    await service.start();
    expect(await service.status()).toBe(Status.STARTED);
    await service.restart();
    expect(await service.status()).toBe(Status.STARTED);
    await service.stop();
    expect(await service.status()).toBe(Status.STOPPED);
    expect(service.start).toHaveBeenCalledTimes(2);
    expect(service.stop).toHaveBeenCalledTimes(2);
    expect(service.restart).toHaveBeenCalledTimes(1);
  });
});
