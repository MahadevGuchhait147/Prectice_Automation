import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();
export default defineConfig({
  // Test files location
  testDir: 'support/test',

  // Run tests in parallel
  fullyParallel: true,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // HTML report
  reporter: 'html',

  // Common settings
  use: {
    baseURL: process.env.BASE_URL,

    // Take screenshot only when test fails
    screenshot: 'only-on-failure',

    // Record trace on first retry
    trace: 'on-first-retry',

    // Run tests in browser
    headless: true,
  },

  // Browser configuration
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});