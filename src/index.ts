import "reflect-metadata";
import { Logger } from "./Logger";
import { App } from "./App";
import { container } from "tsyringe";
import { Config } from "./Config";
import { LogLevel } from "./LogLevel";

container.register("LogLevel", {
  useValue:
    LogLevel[(process.env.LOG_LEVEL as unknown) as LogLevel] ?? LogLevel.INFO,
});
container.register("IConfig", { useClass: Config });
container.register("ILogger", { useClass: Logger });

const app = container.resolve(App);
app.start();
app.stop();
