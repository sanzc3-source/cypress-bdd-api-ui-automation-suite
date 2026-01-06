const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    specPattern: [
      "cypress/e2e/ui/**/*.feature",
      "cypress/e2e/api/**/*.feature",
    ],

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // THE FIX: Tag expression must be in config.env.tags (lowercase)
      // Supported ways to pass it:
      //   1) --env tags="..."
      //   2) CYPRESS_tags="..."
      // Also accept legacy TAGS to avoid pain.
      config.env.tags =
        config.env.tags ||
        process.env.CYPRESS_tags ||
        process.env.TAGS ||
        "";

      console.log("Cucumber tag expression =", config.env.tags);

      return config;
    },
  },

  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: false,
});
