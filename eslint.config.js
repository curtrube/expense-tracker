import globals from 'globals';
import eslint from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/semi': ['error', 'always'],
      'sort-imports': 'error',
      'no-unused-vars': 'warn',
    },
  },
];
