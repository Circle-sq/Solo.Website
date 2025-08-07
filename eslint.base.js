const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nx = require('@nx/eslint-plugin');
const react = require('eslint-plugin-react');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    {
        plugins: {
            react,
            '@nx': nx,
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
    ...compat.extends('plugin:@nx/typescript').map((config) => ({
        ...config,
        files: ['**/*.ts', '**/*.tsx'],
    })),
    ...compat.extends('plugin:@nx/javascript').map((config) => ({
        ...config,
        files: ['**/*.js'],
    })),
];
