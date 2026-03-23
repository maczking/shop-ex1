const { defineConfig } = require("cypress");
const fs = require('fs')

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  video: true,
  videoCompression: true,
  e2e: {
    includeShadowDom: true,
    chromeWebSecurity: true,
    env: {
      viewports: [
        { name: "desktop", width: 1920, height: 1080 },
        { name: "mobile", width: 375, height: 667 },
      ],
    },
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
              test.attempts.some((attempt) => attempt.state === 'failed')
          );
          if (!failures && fs.existsSync(results.video)) {
            fs.unlinkSync(results.video);
          }
        }
      });
    },

  },
});


