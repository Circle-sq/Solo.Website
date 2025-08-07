import path from 'path';
import { fileURLToPath } from 'url';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

import baseEslint from './eslint.base.js';
import legacyEslint from './legacy.eslint.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [
    ...compat.extends('plugin:@nx/react'),
    ...baseEslint,
    ...legacyEslint,
    {
        ignores: ['!**/*'],
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js'],
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
            '@nx/enforce-module-boundaries': ['off'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
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
        files: ['**/*.test.ts', '**/*.test.tsx'],
        rules: {
            '@typescript-eslint/no-magic-numbers': 'off',
        },
    },
    {
        files: ['**/*.tsx'],
        ignores: ['**/*.spec.tsx', '**/*.test.tsx'],
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        rules: {
            'react/jsx-pascal-case': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'class',
                    modifiers: ['exported'],
                    format: ['PascalCase'],
                },
                {
                    selector: 'function',
                    modifiers: ['exported'],
                    format: ['PascalCase'],
                    leadingUnderscore: 'allow',
                },
            ],
        },
    },
];
