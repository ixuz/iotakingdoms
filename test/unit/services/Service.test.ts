import { Service, ServiceStatus } from "../../../src/services/Service";

describe("Service", (): void => {
  it("should start, restart and stop the service", async (): Promise<void> => {
    const service = new Service();
    jest.spyOn(service, "start");
    jest.spyOn(service, "stop");
    jest.spyOn(service, "restart");
    expect(await service.status()).toBe(ServiceStatus.STOPPED);
    await service.start();
    expect(await service.status()).toBe(ServiceStatus.STARTED);
    await service.restart();
    expect(await service.status()).toBe(ServiceStatus.STARTED);
    await service.stop();
    expect(await service.status()).toBe(ServiceStatus.STOPPED);
    expect(service.start).toHaveBeenCalledTimes(2);
    expect(service.stop).toHaveBeenCalledTimes(2);
    expect(service.restart).toHaveBeenCalledTimes(1);
  });
});
