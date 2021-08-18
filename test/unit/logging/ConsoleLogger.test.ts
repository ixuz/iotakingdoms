import { ConsoleLogger } from "../../../src/logging/ConsoleLogger";
import { LogLevel } from "../../../src/logging/LogLevel";

describe("ConsoleLogger", (): void => {
  it("should print logged messages to console", async (): Promise<void> => {
    const logger = new ConsoleLogger(LogLevel[LogLevel.DEBUG]);
    jest.spyOn(global.console, "error");
    jest.spyOn(global.console, "warn");
    jest.spyOn(global.console, "info");
    jest.spyOn(global.console, "debug");
    expect(logger.error("ERROR")).toBeTruthy();
    expect(logger.warn("WARN")).toBeTruthy();
    expect(logger.info("INFO")).toBeTruthy();
    expect(logger.debug("DEBUG")).toBeTruthy();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.debug).toHaveBeenCalledTimes(1);
  });
});
