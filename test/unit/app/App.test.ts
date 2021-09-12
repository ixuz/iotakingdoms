import { App } from "../../../src/app/App";
import { ILogger } from "../../../src/logger/ILogger";
import { IHttpServer } from "../../../src/http/IHttpServer";

const Logger = jest.fn().mockImplementation(() => ({
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
}));
const logger = new Logger() as jest.Mocked<ILogger>;

const HttpServer = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
}));
const httpServer = new HttpServer() as jest.Mocked<IHttpServer>;

describe("App", () => {
  let app: App;

  beforeEach(() => {
    jest.resetAllMocks();
    app = new App(logger, httpServer);
  });

  it("start and stops", async () => {
    await app.start();
    expect(logger.info).toHaveBeenCalledWith("App started");
    await app.stop();
    expect(logger.info).toHaveBeenCalledWith("App stopped");
  });
});
