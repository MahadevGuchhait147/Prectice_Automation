import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({

  // Test files location
  testDir: 'support/test',

  // Run tests in parallel
  fullyParallel: true,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Terminal result + HTML report
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  // Common settings
  use: {

    // Base URL from .env
    baseURL: process.env.BASE_URL,

    // Screenshot only when test fails
    screenshot: 'only-on-failure',

    // Record trace on first retry
    trace: 'on-first-retry',

    // Run browser in headless mode
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