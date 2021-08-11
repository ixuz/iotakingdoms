#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const files = [path.resolve(__dirname, "../dist")];
const o = { recursive: true, force: true };
files.forEach((p) => fs.rm(p, o, (e) => (e ? console.log(e) : null)));
