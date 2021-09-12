import { Config } from "../../../src/config/Config";
import { LogLevel } from "../../../src/logger/LogLevel";

describe("Config", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("runs.", () => {
    const config = new Config(LogLevel.INFO);
    expect(config.logLevel()).toBe(LogLevel.INFO);
  });
});
