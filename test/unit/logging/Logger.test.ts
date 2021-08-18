import { Logger } from "../../../src/logging/Logger";
import { LogLevel } from "../../../src/logging/LogLevel";

describe("Logger", (): void => {
  it("should not log any message if configured LOG_LEVEL is 'NONE'", async (): Promise<
    void
  > => {
    const logger = new Logger(LogLevel[LogLevel.NONE]);
    jest.spyOn(logger, "log");
    expect(logger.error("ERROR")).toBeFalsy();
    expect(logger.warn("WARN")).toBeFalsy();
    expect(logger.info("INFO")).toBeFalsy();
    expect(logger.debug("DEBUG")).toBeFalsy();
    expect(logger.log).toHaveBeenCalledTimes(0);
  });

  it("logs 'ERROR' messages if configured LOG_LEVEL is 'ERROR'", async (): Promise<
    void
  > => {
    const logger = new Logger(LogLevel[LogLevel.ERROR]);
    jest.spyOn(logger, "log");
    expect(logger.error("ERROR")).toBeTruthy();
    expect(logger.warn("WARN")).toBeFalsy();
    expect(logger.info("INFO")).toBeFalsy();
    expect(logger.debug("DEBUG")).toBeFalsy();
    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log).toHaveBeenCalledWith(1, "ERROR");
  });

  it("logs 'ERROR|WARN' messages if configured LOG_LEVEL is 'WARN'", async (): Promise<
    void
  > => {
    const logger = new Logger(LogLevel[LogLevel.WARN]);
    jest.spyOn(logger, "log");
    expect(logger.error("ERROR")).toBeTruthy();
    expect(logger.warn("WARN")).toBeTruthy();
    expect(logger.info("INFO")).toBeFalsy();
    expect(logger.debug("DEBUG")).toBeFalsy();
    expect(logger.log).toHaveBeenCalledTimes(2);
    expect(logger.log).toHaveBeenCalledWith(1, "ERROR");
    expect(logger.log).toHaveBeenCalledWith(2, "WARN");
  });

  it("logs 'ERROR|WARN|INFO' messages if configured LOG_LEVEL is 'INFO'", async (): Promise<
    void
  > => {
    const logger = new Logger(LogLevel[LogLevel.INFO]);
    jest.spyOn(logger, "log");
    expect(logger.error("ERROR")).toBeTruthy();
    expect(logger.warn("WARN")).toBeTruthy();
    expect(logger.info("INFO")).toBeTruthy();
    expect(logger.debug("DEBUG")).toBeFalsy();
    expect(logger.log).toHaveBeenCalledTimes(3);
    expect(logger.log).toHaveBeenCalledWith(1, "ERROR");
    expect(logger.log).toHaveBeenCalledWith(2, "WARN");
    expect(logger.log).toHaveBeenCalledWith(3, "INFO");
  });

  it("logs 'ERROR|WARN|INFO|DEBUG' messages if configured LOG_LEVEL is 'DEBUG'", async (): Promise<
    void
  > => {
    const logger = new Logger(LogLevel[LogLevel.DEBUG]);
    jest.spyOn(logger, "log");
    expect(logger.error("ERROR")).toBeTruthy();
    expect(logger.warn("WARN")).toBeTruthy();
    expect(logger.info("INFO")).toBeTruthy();
    expect(logger.debug("DEBUG")).toBeTruthy();
    expect(logger.log).toHaveBeenCalledTimes(4);
    expect(logger.log).toHaveBeenCalledWith(1, "ERROR");
    expect(logger.log).toHaveBeenCalledWith(2, "WARN");
    expect(logger.log).toHaveBeenCalledWith(3, "INFO");
    expect(logger.log).toHaveBeenCalledWith(4, "DEBUG");
  });
});
