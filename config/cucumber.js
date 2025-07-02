module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: [
      "test/features/"
    ],
    dryRun: false,
    require: [
      "test/steps/*.ts",
      "helper/support/hooks.ts"
    ],
    worldParameters: {},
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json"
    ],
    strict: false,
    parallel: 2,
    timeout: 90000
  }
}