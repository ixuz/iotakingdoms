import { Config } from "../../../src/config/Config";
import { LogLevel } from "../../../src/logger/LogLevel";

describe("Config", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("sets up the config properties.", () => {
    const config = new Config(LogLevel.DEBUG, 4000);
    expect(config.logLevel()).toBe(LogLevel.DEBUG);
    expect(config.port()).toBe(4000);
  });
});
