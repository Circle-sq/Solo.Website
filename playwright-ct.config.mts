import { defineConfig, devices } from '@playwright/experimental-ct-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

const plugins = [react(), tsconfigPaths()];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './',
    testMatch: /.*\.pwc\.tsx/,
    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    snapshotDir: './__snapshots__',
    /* Maximum time one test can run for. */
    timeout: 10 * 1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        video: {
            mode: 'on',
            size: { width: 1280, height: 720 },
        },
        //video: 'on-first-retry',

        /* Port to use for Playwright component endpoint. */
        ctPort: 3100,
        ctViteConfig: {
            plugins,
            build: {
                rollupOptions: {
                    // TODO: find a way to fix warning
                    //      "Error when using sourcemap for reporting an error: Can't resolve original location of error."
                    //      instead of skipping it
                    onwarn(warning, warn) {
                        if (warning.code === 'SOURCEMAP_ERROR') {
                            return;
                        }
                        warn(warning);
                    },
                }
            },
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
