import js from '@eslint/js'
import globals from 'globals'

// Standalone ESLint flat config for @coreprime/kbot-game-totala.
export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  {
    files: ['**/*.test.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-empty': ['warn', { allowEmptyCatch: true }],
    },
  },
]
