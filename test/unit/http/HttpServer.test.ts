import { LogLevel } from "../../../src/logger/LogLevel";
import { IConfig } from "../../../src/config/IConfig";
import { ILogger } from "../../../src/logger/ILogger";
import { IHttpServer } from "../../../src/http/IHttpServer";
import { HttpServer } from "../../../src/http/HttpServer";
import { IMiddleware } from "../../../src/http/middleware/IMiddleware";
import { Request, Response, NextFunction } from "express";

// TODO: Mock the express server dependency, so that it doesn't actually start a real server.

const Config = jest.fn().mockImplementation(() => ({
  logLevel: jest.fn(),
  port: jest.fn(),
}));
const config = new Config() as jest.Mocked<IConfig>;

const Logger = jest.fn().mockImplementation(() => ({
  debug: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
}));
const logger = new Logger() as jest.Mocked<ILogger>;

const UsageMiddleware = jest.fn().mockImplementation(() => ({
  router: () => (req: Request, res: Response, next: NextFunction) => next(),
}));
const usageMiddleware = new UsageMiddleware() as jest.Mocked<IMiddleware>;

const SwaggerMiddleware = jest.fn().mockImplementation(() => ({
  router: () => (req: Request, res: Response, next: NextFunction) => next(),
}));
const swaggerMiddleware = new SwaggerMiddleware() as jest.Mocked<IMiddleware>;

describe("HttpServer", () => {
  let httpServer: IHttpServer;

  beforeEach(() => {
    jest.resetAllMocks();
    httpServer = new HttpServer(
      logger,
      3000,
      usageMiddleware,
      swaggerMiddleware
    );
  });

  it("wont try to stop a server that is not started", async () => {
    await httpServer.stop();
  });

  it("starts and stops the http server", async () => {
    config.logLevel.mockReturnValue(LogLevel.DEBUG);
    config.port.mockReturnValue(3000);

    await httpServer.start();
    await httpServer.stop();
  });
});
