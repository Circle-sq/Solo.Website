import eslintReact from 'eslint-plugin-react';
import eslintImport from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import lodash from 'eslint-plugin-lodash';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import vitest from 'eslint-plugin-vitest';
import storybookEslint from 'eslint-plugin-storybook';

// TODO: cleanup next rules
// This rules should be fixed before removed. We changed everything to warn to start checking for linting in CI.
const LEGACY_RULES_THAT_SHOULD_BE_REMOVED_JS = {
    'react/no-unknown-property': 'warn',
    'react/no-array-index-key': 'error',
    'react/no-string-refs': 'warn',
    'no-useless-escape': 'warn',
    'no-prototype-builtins': 'warn',
    'no-case-declarations': 'warn',
    'no-ex-assign': 'warn',
    'no-restricted-globals': 'warn',
};

const LEGACY_RULES_THAT_SHOULD_BE_REMOVED_TS = {
    ...LEGACY_RULES_THAT_SHOULD_BE_REMOVED_JS,
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
};

const WAYS_TO_IMPROVE_READABILITY_DISABLED_FOR_NOW = {
    'lodash/prefer-lodash-typecheck': 'off',
    'lodash/prefer-get': 'off',
    'lodash/import-scope': [2, 'method'],
    'lodash/path-style': 'off',
    'lodash/prop-shorthand': 'off',
    'lodash/prefer-noop': 'off',
    'lodash/prefer-constant': 'off',
    'lodash/prefer-is-nil': 'off',
    'lodash/prefer-matches': 'off',
    'lodash/matches-prop-shorthand': 'off',
    'lodash/collection-ordering': 'off',
    'lodash/prefer-lodash-method': 'off',
    'lodash/prefer-includes': 'off',
    'lodash/prefer-some': 'off',
    'lodash/prefer-over-quantifier': 'off',
};

const COMMON_JS_TS_RULES = {
    curly: 'error',
};

export default [
    {
        plugins: {
            react: eslintReact,
            import: eslintImport,
            'jsx-a11y': jsxA11Y,
            'react-hooks': reactHooks,
            '@typescript-eslint': typescriptEslint,
            storybook: storybookEslint,
            prettier,
            lodash,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
                ...globals.jest,
                JSX: true,
                NodeJS: true,
                $appState: true,
                $zopim: true,
            },

            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module',
            parserOptions: {
                requireConfigFile: false,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/external-module-folders': ['node_modules', 'node_modules/@types'],
            'import/parsers': {
                '@typescript-eslint/parser': ['.js'],
            },
            'import/extensions': ['.js', '.ts', '.tsx'],
            'import/resolver': {
                node: {
                    paths: ['src'],
                    extensions: ['.js', '.ts', '.tsx'],
                },
            },
            'import/ignore': ['node_modules'],
        },
        rules: {
            'react/jsx-pascal-case': 'off',
            'react/jsx-key': 'error',
            'prettier/prettier': 'warn',
            'react/jsx-no-target-blank': 'error',
            'react/no-find-dom-node': 'error',
            'react/no-unescaped-entities': 'error',
            'no-empty': 'error',
            eqeqeq: 'warn',
            'no-console': [
                'error',
                {
                    allow: ['error', 'warn', 'info'],
                },
            ],
            'no-return-await': 'warn',
            'prefer-const': 'error',
            'prefer-promise-reject-errors': 'warn',
            'no-param-reassign': 'error',
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
            'no-shadow-restricted-names': 'error',
            'no-unreachable': 'error',
            'no-duplicate-case': 'error',
            'no-dupe-else-if': 'error',
            'no-constant-condition': 'error',
            'prefer-spread': 'off',
            'prefer-rest-params': 'off',
            'jsx-a11y/mouse-events-have-key-events': 'warn',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/no-noninteractive-element-interactions': 'warn',
            'jsx-a11y/iframe-has-title': 'warn',
            'jsx-a11y/no-onchange': 'warn',
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/media-has-caption': 'error',
            'jsx-a11y/anchor-has-content': 'error',
            'require-yield': 'error',
            'prefer-template': 'warn',
            'react/display-name': 'error',
            'react/jsx-no-useless-fragment': 'off',
            'padding-line-between-statements': [
                'warn',
                {
                    blankLine: 'always',
                    prev: ['*'],
                    next: [
                        'return',
                        'block',
                        'block-like',
                        'case',
                        'class',
                        'default',
                        'for',
                        'function',
                        'if',
                        'switch',
                        'throw',
                        'try',
                        'while',
                        'break',
                        'continue',
                    ],
                },
            ],
            'import/namespace': 'warn',
            'import/default': 'warn',
            'import/named': 'warn',
            'import/no-duplicates': 'warn',
            'import/no-unresolved': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': [
                'warn',
                {
                    additionalHooks: '(useRecoilCallback)',
                },
            ],
            ...LEGACY_RULES_THAT_SHOULD_BE_REMOVED_JS,
            ...COMMON_JS_TS_RULES,
            ...WAYS_TO_IMPROVE_READABILITY_DISABLED_FOR_NOW,
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['**/playwright*.ts', 'libs/**/.storybook/*.tsx', 'libs/**/.storybook/*.ts'],
        plugins: {
            react: eslintReact,
            '@typescript-eslint': typescriptEslint,
            prettier,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.json',
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },
        settings: {
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
        },
        rules: {
            'prettier/prettier': 'warn',
            'no-dupe-class-members': 'off',
            'no-undef': 'off',
            '@typescript-eslint/strict-boolean-expressions': [
                'warn',
                {
                    allowString: true,
                    allowNumber: true,
                    allowNullableBoolean: true,
                    allowNullableObject: false,
                    allowNullableString: false,
                    allowNullableNumber: false,
                    allowNullableEnum: false,
                    allowAny: false,
                    allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                },
            ],
            '@typescript-eslint/no-magic-numbers': [
                'warn',
                {
                    ignore: [-1, 0, 1],
                    ignoreEnums: true,
                },
            ],
            '@typescript-eslint/promise-function-async': 'warn',
            '@typescript-eslint/prefer-regexp-exec': 'warn',
            '@typescript-eslint/member-ordering': 'warn',
            '@typescript-eslint/restrict-plus-operands': 'warn',
            '@typescript-eslint/unbound-method': 'warn',
            '@typescript-eslint/no-misused-promises': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/no-dynamic-delete': 'warn',
            '@typescript-eslint/unified-signatures': 'warn',
            '@typescript-eslint/await-thenable': 'warn',
            '@typescript-eslint/require-array-sort-compare': 'warn',
            '@typescript-eslint/no-extraneous-class': 'warn',
            '@typescript-eslint/parameter-properties': 'warn',
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/no-duplicate-enum-values': 'off',
            '@typescript-eslint/no-explicit-any': ['warn'],
            '@typescript-eslint/no-for-in-array': 'error',
            'no-restricted-syntax': [
                'warn',
                {
                    selector: "ImportDeclaration[source.value='./types'] > ImportSpecifier[imported.name=/Props/]",
                    message: 'Declare props type in the component instead of importing it.',
                },
            ],
            'no-useless-constructor': 'off',
            '@typescript-eslint/no-useless-constructor': 'warn',
            'no-unused-vars': 'off',
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': [
                'warn',
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                    allowTaggedTemplates: true,
                },
            ],
            ...LEGACY_RULES_THAT_SHOULD_BE_REMOVED_TS,
            ...COMMON_JS_TS_RULES,
            ...WAYS_TO_IMPROVE_READABILITY_DISABLED_FOR_NOW,
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/no-redundant-type-constituents': 'error',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/no-unnecessary-type-arguments': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        },
    },
    {
        ...vitest.configs.recommended,
        files: ['**/*.spec.ts{x,}'],
        plugins: {
            vitest,
        },
        rules: {
            'vitest/valid-title': 'warn',
            '@typescript-eslint/no-magic-numbers': 'off',
            'no-restricted-syntax': 'off',
        },
    },
];
