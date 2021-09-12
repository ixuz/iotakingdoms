import { App } from "../../../src/app/App";
import { ILogger } from "../../../src/logger/ILogger";

const Logger = jest.fn().mockImplementation(() => ({
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
}));
const logger = new Logger() as jest.Mocked<ILogger>;

describe("App", () => {
  let app: App;

  beforeEach(() => {
    jest.resetAllMocks();
    app = new App(logger);
  });

  it("start and stops", () => {
    app.start();
    expect(logger.info).toHaveBeenCalledWith("App started");
    app.stop();
    expect(logger.info).toHaveBeenCalledWith("App stopped");
  });
});
