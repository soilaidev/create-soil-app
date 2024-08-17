// @ts-check
"use strict";
const commander = require("commander");
const envinfo = require("envinfo");
const chalk = require("chalk");
const packageJson = require("./package.json");

let projectName;

function init() {
  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .action((name) => {
      projectName = name;
    })
    .allowUnknownOption()
    .on("--help", () => {
      console.log(`    ${chalk.green("<project-directory>")} is required.`);
    })
    .parse(process.argv);

  if (program.info) {
    console.log(chalk.bold("\nEnvironment Info:"));
    console.log(`\n  current version of ${packageJson.name}: ${packageJson.version}`);
    console.log(`  running from ${__dirname}`);
    return envinfo
      .run(
        {
          System: ["OS", "CPU"],
          Binaries: ["Node", "npm", "Yarn"],
          Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
          npmPackages: ["soilai"],
          npmGlobalPackages: ["create-soilai-app"],
        },
        {
          duplicates: true,
          showNotFound: true,
        }
      )
      .then(console.log);
  }

  if (typeof projectName === "undefined") {
    console.error("Please specify the project directory:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("my-soilai-app")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
    process.exit(1);
  }
}

module.exports = {
  init,
};
