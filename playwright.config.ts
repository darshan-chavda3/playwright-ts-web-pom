import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    timeout: 90 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['html', { open: 'on-failure' }]],

    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 90 * 1000,
        navigationTimeout: 90 * 1000,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
    ],
});
