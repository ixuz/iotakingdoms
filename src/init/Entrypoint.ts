import { ComponentsManager } from "componentsjs";
import * as Path from "path";

export class Entrypoint {
  public async run(): Promise<unknown> {
    const componentsManager = await ComponentsManager.build({
      mainModulePath: Path.join(__dirname, "/../.."), // Path to your npm package's root
    });

    await componentsManager.configRegistry.register("config/default.jsonld");

    const app = "urn:iotakingdoms:App";

    const pf = "urn:iotakingdoms:env:";
    const settings = {
      variables: {
        [pf + "LOG_LEVEL"]: process.env.LOG_LEVEL || "INFO",
        [pf + "PORT"]: process.env.PORT || 3000,
      },
    };

    const appInstance = await componentsManager.instantiate(app, settings);

    return appInstance;
  }
}
