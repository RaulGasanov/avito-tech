module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'plugin:storybook/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
        {
            files: ['**/src/**/*.{test, stories}.{ts,tsx}', '**/src/shared/ui/Icon/**/*.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension':
         [
             2,
             { extensions: ['.js', '.jsx', '.tsx'] },
         ],
        indent: [2, 4],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off', // warn
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off', // warn
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'max-len': ['warn', { ignoreComments: true, code: 120 }],
        'i18next/no-literal-string': [
            'warn',
            {
                markupOnly: true,
                ignoreAttribute: ['data-testid', 'to', 'align', 'alt'],
            },
        ],
        'no-console': 'off',
        'linebreak-style': 'off',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
        'react/no-unstable-nested-components': 'warn',
        'consistent-return': 'off',
        'jsx-a11y/ no-noninteractive-element-to-interactive-role': 'off',
        'no-unused-expressions': 'off',
        'react/no-array-index-key': 'off',
        'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
    globals: {
        __IS_DEV__: true,
    },
};
