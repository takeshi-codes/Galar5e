module.exports = {
  globals: {
    __PATH_PREFIX__: true,
    tw: true,
  },
  parser: 'babel-eslint',
  extends: [
    `react-app`,
    `prettier`  
  ],
  plugins:[
    'prettier',
    'react'
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
