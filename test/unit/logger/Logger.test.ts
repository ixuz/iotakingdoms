import { Logger } from "../../../src/logger/Logger";
import { LogLevel } from "../../../src/logger/LogLevel";
import { IConfig } from "../../../src/config/IConfig";
import { ILogger } from "../../../src/logger/ILogger";

const Config = jest.fn().mockImplementation(() => ({
  logLevel: jest.fn(),
}));
const config = new Config() as jest.Mocked<IConfig>;

describe("Logger", () => {
  let logger: ILogger;
  let logSpy: jest.SpyInstance<void, [LogLevel, string]>;

  beforeEach(() => {
    jest.resetAllMocks();
    logger = new Logger(config);
    logSpy = jest.spyOn(logger, "log");
  });

  it("logs DEBUG, INFO, WARN & ERROR messages if log level is DEBUG.", () => {
    config.logLevel.mockReturnValue(LogLevel.DEBUG);
    logger.debug("");
    logger.info("");
    logger.warn("");
    logger.error("");
    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenCalledWith(LogLevel.DEBUG, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.INFO, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.WARN, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.ERROR, "");
  });

  it("logs INFO, WARN & ERROR messages if log level is INFO.", () => {
    config.logLevel.mockReturnValue(LogLevel.INFO);
    logger.debug("");
    logger.info("");
    logger.warn("");
    logger.error("");
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.DEBUG, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.INFO, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.WARN, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.ERROR, "");
  });

  it("logs WARN & ERROR messages if log level is WARN.", () => {
    config.logLevel.mockReturnValue(LogLevel.WARN);
    logger.debug("");
    logger.info("");
    logger.warn("");
    logger.error("");
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.DEBUG, "");
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.INFO, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.WARN, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.ERROR, "");
  });

  it("logs ERROR messages if log level is ERROR.", () => {
    config.logLevel.mockReturnValue(LogLevel.ERROR);
    logger.debug("");
    logger.info("");
    logger.warn("");
    logger.error("");
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.DEBUG, "");
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.INFO, "");
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.WARN, "");
    expect(logSpy).toHaveBeenCalledWith(LogLevel.ERROR, "");
  });

  it("logs no messages if log level is NONE.", () => {
    config.logLevel.mockReturnValue(LogLevel.NONE);
    logger.debug("");
    logger.info("");
    logger.warn("");
    logger.error("");
    expect(logSpy).toHaveBeenCalledTimes(0);
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.DEBUG, "");
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.INFO, "");
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.WARN, "");
    expect(logSpy).not.toHaveBeenCalledWith(LogLevel.ERROR, "");
  });
});
