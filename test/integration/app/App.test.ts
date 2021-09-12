import "reflect-metadata";
import { container } from "tsyringe";
import { App } from "../../../src/app/App";
import { Config } from "../../../src/config/Config";
import { Logger } from "../../../src/logger/Logger";

describe("App", () => {
  it("resolves dependencies.", () => {
    container.register("LogLevel", { useValue: "WARN" });
    container.register("Config", Config);
    container.register("Logger", Logger);
    const app = container.resolve(App);
    app.start();
    expect(1).toBe(1);
  });
});
