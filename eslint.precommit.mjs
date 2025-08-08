import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import eslintConfig from './eslint.config.mjs';

const importOrderRules = [
    'error',
    {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
            {
                pattern: '@solo-*/**',
                group: 'internal',
                position: 'before',
            },
            {
                pattern: 'src/**',
                group: 'internal',
            },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        distinctGroup: true,
        warnOnUnassignedImports: true,
        alphabetize: {
            order: 'asc',
            caseInsensitive: true,
        },
    },
];

export default [
    ...eslintConfig,
    {
        ignores: ['**/tests/', '**/node_task/', '**/src_sassbuild/'],
    },
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },
        languageOptions: {
            parser: tsParser,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    selector: "ImportDeclaration[source.value='./types'] > ImportSpecifier[imported.name=/Props/]",
                    message: 'Declare props type in the component instead of importing it.',
                },
            ],
            'import/order': importOrderRules,
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: false,
                    },
                },
            ],
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: [
                                'src/appState/Environment/ThemesStar/themed',
                                'src/appState/Environment/ThemesStar/palette',
                                'src/appState/Environment/ThemesStar/beteast-theme',
                                './Environment/ThemesStar/themed',
                            ],
                            message: 'deprecated, use @solo-ui/system instead',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.spec.ts{x,}', '**/*.test.ts{x,}'],
        rules: {
            'no-restricted-syntax': 'off',
            'import/order': importOrderRules,
        },
    },
];
