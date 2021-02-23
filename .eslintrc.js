module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0, // Adicionado devido aos erros gerados na quebra de linhas windows
    'global-require': 0, // Adicionado devido aos erros gerados na quebra de linhas windows
    'eslint linebreak-style': [0, 'error', 'windows'], // Adicionado devido aos erros gerados na quebra de linhas windows
  },
};
