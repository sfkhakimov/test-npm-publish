const path = require('path')
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
    parserOptions: {
    project: [
        './lib/tsconfig.json',
        './site/tsconfig.json',
    ],
    tsconfigRootDir: path.resolve(__dirname),
    },
}
