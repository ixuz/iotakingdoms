import "reflect-metadata";
import { Logger } from "./logger/Logger";
import { App } from "./app/App";
import { container } from "tsyringe";
import { Config } from "./config/Config";
import { LogLevel } from "./logger/LogLevel";

container.register("LogLevel", {
  useValue:
    LogLevel[(process.env.LOG_LEVEL as unknown) as LogLevel] ?? LogLevel.INFO,
});
container.register("Config", { useClass: Config });
container.register("Logger", { useClass: Logger });

const app = container.resolve(App);
app.start();
app.stop();
