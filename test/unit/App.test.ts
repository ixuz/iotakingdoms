import { App } from "../../src/App";

describe("App.", () => {
  it("runs.", () => {
    const app = new App();
    app.say();
    expect(1).toBe(1);
  });
});
