import { App } from "../../src/App";
import { ILogger } from "../../src/ILogger";
import { LogLevel } from "../../src/LogLevel";

const MockLogger = jest.fn().mockImplementation(() => ({
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
}));
const mockLogger = new MockLogger() as jest.Mocked<ILogger>;

describe("App", () => {
  let app: App;
  let logSpy: jest.SpyInstance<void, [LogLevel, string]>;

  beforeEach(() => {
    jest.resetAllMocks();
    app = new App(mockLogger);
    logSpy = jest.spyOn(mockLogger, "log");
  });

  it("start and stops", () => {
    app.start();
    expect(logSpy).toHaveBeenCalledWith(LogLevel.INFO, "App started");
    app.stop();
    expect(logSpy).toHaveBeenCalledWith(LogLevel.INFO, "App stopped");
  });
});
