const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const baseEslint = require('../../../eslint.base.js');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    ...compat.extends('plugin:@nx/react'),
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
];
