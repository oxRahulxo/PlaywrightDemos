import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 30_000, // 30 seconds per test
  /* globalTimeout: 60_000, */ // 1 minute for the entire test suite
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI 2 times and locally 1 time */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],['github']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    launchOptions: {
      args: [
        '--no-default-browser-check',
        '--disable-infobars',
        '--disable-dev-shm-usage',
        ],
    },
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 0, // Disable action timeout to allow long-running actions
    ignoreHTTPSErrors: false, // Ignore HTTPS errors for testing purposes
    headless: true, // Run tests in headless mode for faster execution
    /* options: 'retain-on-failure', 'on', 'off' */
    video: 'on', // Record video only on test failure
    /* options: 'off', 'on', 'only-on-failure' */
    screenshot: {
      mode: 'on',
      fullPage: true,
    },

    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup", testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'Google Chrome',
      dependencies: ['setup'],
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth/customer02.json', 
        channel: 'chrome' /* Targets your locally installed chrome */
      },
    },

    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
   
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },


});
