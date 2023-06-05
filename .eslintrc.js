module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:vue/base'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'only-multiline'],
    quotes: ['warn', 'single'],
    'prefer-template': 'warn',
    'arrow-body-style': 'warn',
    'no-unused-vars': 'warn',
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-return': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    'max-len': 'warn',
    'no-underscore-dangle': 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'vue/script-setup-uses-vars': 'error',
    'vue/multi-word-component-names': 'off',
    'no-irregular-whitespace': 'off',
    "linebreak-style": 0
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue']
      }
    }
  }
};
