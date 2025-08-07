import '@vitest/coverage-v8';
import type { InlineConfig } from 'vitest';
import { configDefaults } from 'vitest/config';

const config: InlineConfig = {
    globals: true,
    testTimeout: 20000, // Global timeout for one test 20 sec, default is 5 sec
    environment: 'jsdom',
    setupFiles: ['./tests/vitest.setup.ts', './tests/unit/mocks/unleash.setup.ts'],
    reporters: ['dot'],
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
    coverage: {
        provider: 'v8',
        reportsDirectory: './reports/coverage-vitest',
        reporter: [['lcov'], ['json'], ['text-summary']],
        exclude: [
            '.stories.*$', // This line excludes Storybook stories
            '--ct', // This line excludes playwright tests
        ],
        thresholds: {
            lines: 54,
            functions: 32,
            branches: 65,
            statements: 54,
        },
    },
    exclude: [...configDefaults.exclude, '--ct'],
};

export default config;
