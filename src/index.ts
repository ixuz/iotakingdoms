import "reflect-metadata";
import { Logger } from "./logger/Logger";
import { App } from "./app/App";
import { container } from "tsyringe";
import { Config } from "./config/Config";
import { LogLevel } from "./logger/LogLevel";
import { HttpServer } from "./http/HttpServer";
import { SwaggerMiddleware } from "./http/middleware/SwaggerMiddleware";
import { UsageMiddleware } from "./http/middleware/UsageMiddleware";

container.register("LogLevel", {
  useValue:
    LogLevel[(process.env.LOG_LEVEL?.toUpperCase() as unknown) as LogLevel] ??
    LogLevel.INFO,
});
container.register("http:Port", {
  useValue: ((process.env.PORT as unknown) as number) ?? 3000,
});
container.register("Config", { useClass: Config });
container.register("Logger", { useClass: Logger });
container.register("http:middleware:UsageMiddleware", {
  useClass: UsageMiddleware,
});
container.register("http:middleware:SwaggerBaseUrl", {
  useValue: "/api-docs",
});
container.register("http:middleware:SwaggerDocument", {
  useValue: require("./generated/swagger.json"),
});
container.register("http:middleware:SwaggerMiddleware", {
  useClass: SwaggerMiddleware,
});
container.register("http:HttpServer", { useClass: HttpServer });

const app = container.resolve(App);

(async () => {
  await app.start();

  const signalHandler = async () => {
    await app.stop();
    process.kill(process.pid);
  };

  ["SIGUSR2", "SIGINT"].forEach((signal) => process.on(signal, signalHandler));
})();
