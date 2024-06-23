const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'prettier': prettierPlugin,
    },
    rules: {
      ...typescript.configs['recommended'].rules,
      ...prettierPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      // Ajoutez ici vos règles personnalisées
    },
  },
];