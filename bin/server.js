#!/usr/bin/env node
const { AppRunner } = require("../dist/init/AppRunner");

const main = async () => {
  const appInstance = await new AppRunner().run();
  await appInstance.start();
};

main();
