const parser = require('jsonc-eslint-parser');

const baseEslint = require('../../eslint.base.js');

module.exports = [
    ...baseEslint,
    {
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: './palettes',
                            message:
                                "Colors from './palettes' are deprecated. Use colors with shades from colors/* dir",
                        },
                    ],
                },
            ],
        },
    },
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
