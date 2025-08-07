import NxMigrationESLintPlugin from './eslint-rules/restrict-imports-from-sportsbook-app.mjs'; // Ensure the path to your custom rule is correct

import eslintConfig from './eslint.config.mjs';

export default [
    ...eslintConfig,
    {
        name: 'nx-migration-check',
        files: ['src/features/**/*.ts', 'src/features/**/*.tsx'],
        plugins: {
            'nx-migration': NxMigrationESLintPlugin,
        },
        rules: {
            'nx-migration/no-import-from-src-in-features': 'error',
        },
    },
];
