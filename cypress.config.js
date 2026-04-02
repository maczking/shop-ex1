const { defineConfig } = require("cypress");
const fs = require('fs')

module.exports = defineConfig({
  video: true,
  videoCompression: true,
  e2e: {
    includeShadowDom: true,
    env: {
      viewports: [
        { name: "desktop", width: 1920, height: 1080 },
        { name: "mobile", width: 375, height: 667 },
      ],
    },
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
         if (!failures && results.video && fs.existsSync(results.video)) {
      try {
         fs.unlinkSync(results.video);
      } catch (e) {
         console.log('Could not delete video:', e.message);
      }
     }
      });
    },

  },
});


