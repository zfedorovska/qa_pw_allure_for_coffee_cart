const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  reporter: [
    ['./reporters/allure-testinfo-adapter.js'], // injects testInfo.allure
    ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: true }],
    ['line'],
  ],

  use: {
    baseURL: 'https://coffee-cart.app',
    testIdAttribute: 'data-test',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
