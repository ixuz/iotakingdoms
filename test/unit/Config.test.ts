import { Config } from "../../src/Config";
import { LogLevel } from "../../src/LogLevel";

describe("Config", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("runs.", () => {
    const config = new Config(LogLevel.INFO);
    expect(config.logLevel()).toBe(LogLevel.INFO);
  });
});
