import babelParser from '@babel/eslint-parser';
import eslint from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
];
