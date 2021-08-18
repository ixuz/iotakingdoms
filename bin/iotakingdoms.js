#!/usr/bin/env node
const { Entrypoint } = require("../dist/init/Entrypoint");

(async () => {
  const instance = await new Entrypoint().run();

  const signalHandler = async (signal) => {
    await instance.stop();
    process.kill(process.pid, signal);
  };

  ["SIGUSR2", "SIGINT"].forEach((signal) => process.on(signal, signalHandler));

  await instance.start();
})();
