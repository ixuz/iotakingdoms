import "reflect-metadata";
import { Logger } from "./Logger";
import { App } from "./App";
import { container } from "tsyringe";
import { Config } from "./Config";

container.register("LogLevel", { useValue: "WARN" });
container.register("IConfig", { useClass: Config });
container.register("ILogger", { useClass: Logger });

const app = container.resolve(App);
app.start();
