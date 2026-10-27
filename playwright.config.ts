import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI
        ? [['github'], ['html', { open: 'never' }]]
        : [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: 'https://www.exotickepalmy.sk/',
        trace: 'on',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
