import "reflect-metadata";
import { container } from "tsyringe";
import { App } from "../../src/App";
import { Config } from "../../src/Config";
import { Logger } from "../../src/Logger";

describe("App", () => {
  it("resolves dependencies.", () => {
    container.register("LogLevel", { useValue: "WARN" });
    container.register("IConfig", Config);
    container.register("ILogger", Logger);
    const app = container.resolve(App);
    app.start();
    expect(1).toBe(1);
  });
});
