import { HttpHandler } from "../../../../../src/services/http/handlers/HttpHandler";

describe("HttpHandler", (): void => {
  it("should send a response", async (): Promise<void> => {
    const httpHandler = new HttpHandler();
    const req = jest.fn();
    const res = {
      send: jest.fn(),
    };
    httpHandler.handle(req, res);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith("OK");
  });
});
