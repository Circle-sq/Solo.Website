const parser = require('jsonc-eslint-parser');

const baseEslint = require('../../../eslint.base.js');

module.exports = [
    ...baseEslint,
    {
        ignores: ['!**/*'],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js'],
        rules: {},
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {},
    },
    {
        files: ['**/*.js'],
        rules: {},
    },
    {
        files: ['**/*.json'],
        languageOptions: {
            parser: parser,
        },
        rules: {
            '@nx/dependency-checks': [
                'error',
                {
                    ignoredFiles: ['{projectRoot}/vite.config.{js,ts,mjs,mts}'],
                },
            ],
        },
    },
];
