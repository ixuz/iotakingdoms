#!/usr/bin/env node
const { Entrypoint } = require("../dist/init/Entrypoint");

(async () => {
  console.log("IOTAKingdoms starting...");
  const iotaKingdomsInstance = await new Entrypoint().run();

  process.on("SIGUSR2", async () => {
    console.log("IOTAKingdoms stopping... [SIGUSR2]");
    await iotaKingdomsInstance.stop();
    console.log("IOTAKingdoms stopped");
    process.kill(process.pid, "SIGUSR2");
  });

  await iotaKingdomsInstance.start();
  console.log("IOTAKingdoms started");
})();
