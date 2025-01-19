import js from '@eslint/js';
import globals from 'globals'; // Correct import for globals
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jestPlugin from 'eslint-plugin-jest'; // Plugin for Jest

export default [
  // Ignore specific directories
  { ignores: ['dist', 'node_modules'] },

  // Configuration for application files (non-test files)
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['**/*.test.js', '**/*.spec.js'], // Ignore test files
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Browser globals
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: '18.3', // Specify your React version
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-uses-react': 'off', // Disable this rule for React 17+
      'react/react-in-jsx-scope': 'off', // Disable this rule for React 17+
    },
  },

  // Configuration for test files (Jest)
  {
    files: ['**/*.test.js', '**/*.spec.js', 'jest.setup.js'], // Include jest.setup.js
    languageOptions: {
      globals: {
        ...globals.jest, // Jest globals (describe, it, expect, etc.)
        ...globals.node, // Node.js globals (global, process, etc.)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: 'module',
      },
    },
    plugins: {
      jest: jestPlugin, // Jest plugin
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // Recommended Jest rules
    },
  },
];