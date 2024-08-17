#!/usr/bin/env node

// @ts-check

"use strict";

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

if (Number(major) < 18) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "Create Soil App requires Node 18 or higher. \n" +
      "Please update your version of Node."
  );
  process.exit(1);
}

const { init } = require("./createSoilApp");

init();
