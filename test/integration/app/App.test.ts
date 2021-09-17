import "reflect-metadata";
import { container } from "tsyringe";
import { App } from "../../../src/app/App";
import { Config } from "../../../src/config/Config";
import { Logger } from "../../../src/logger/Logger";
import { HttpServer } from "../../../src/http/HttpServer";
import { UsageMiddleware } from "../../../src/http/middleware/UsageMiddleware";
import { SwaggerMiddleware } from "../../../src/http/middleware/SwaggerMiddleware";

describe("App", () => {
  it("starts and stops the app.", async () => {
    container.register("LogLevel", { useValue: "WARN" });
    container.register("http:Port", { useValue: 3000 });
    container.register("Config", Config);
    container.register("Logger", Logger);
    container.register("http:HttpServer", HttpServer);
    container.register("http:middleware:UsageMiddleware", UsageMiddleware);
    container.register("http:middleware:SwaggerBaseUrl", {
      useValue: "/api-docs",
    });
    container.register("http:middleware:SwaggerDocument", {
      useValue: require("../../../dist/generated/swagger.json"),
    });
    container.register("http:middleware:SwaggerMiddleware", SwaggerMiddleware);
    const app = container.resolve(App);
    await app.start();
    await app.stop();
    expect(1).toBe(1);
  });
});
