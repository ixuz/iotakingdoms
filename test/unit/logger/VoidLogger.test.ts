import { VoidLogger } from "../../../src/logger/VoidLogger";
import { LogLevel } from "../../../src/logger/LogLevel";
import { ILogger } from "../../../src/logger/ILogger";

describe("VoidLogger", () => {
  let logger: ILogger;

  beforeEach(() => {
    jest.resetAllMocks();
    logger = new VoidLogger();
  });

  it("does not log any logs.", () => {
    logger.debug("");
    logger.info("");
    logger.warn("");
    logger.error("");
    logger.log(LogLevel.DEBUG, "");
    logger.log(LogLevel.INFO, "");
    logger.log(LogLevel.WARN, "");
    logger.log(LogLevel.ERROR, "");
  });
});
