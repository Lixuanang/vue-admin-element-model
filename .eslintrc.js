module.exports = {
  "extends": [
    "standard",
    "plugin:vue/recommended"
  ],
  "plugins": [
    "html",
    "vue"
  ],
  parserOptions: {
    parser: 'babel-eslint',          // https://github.com/babel/babel-eslint
  },
  "env": {                           // http://eslint.org/docs/user-guide/configuring.html#specifying-environments
    "browser": true,                 // browser global variables
    "node": true,                    // Node.js global variables and Node.js-specific rules
    "es6": true
  },
  "rules": {
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    'space-before-blocks': [2, 'always'],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'space-infix-ops': 2,
    'eol-last': 2,
    'newline-per-chained-call': [
      2,
      {
        ignoreChainWithDepth: 2
      }
    ],
    'no-whitespace-before-property': 2,
    'padded-blocks': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'max-len': [0, { 'code': 100 }],
    'camelcase': 2,
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'no-underscore-dangle': 0,
    semi: [2, 'never'],
    'prefer-const': 2,
    'no-const-assign': 2,
    'no-var': 2,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    'no-array-constructor': 2,
    'array-callback-return': 2,
    'prefer-arrow-callback': 2,
    'arrow-parens': [2, 'as-needed'],
    'arrow-body-style': [2, 'as-needed'],
    'no-confusing-arrow': 2,
    'no-duplicate-imports': 2,
    eqeqeq: [2, 'always', {
      null: 'ignore'
    }],
    'no-nested-ternary': 0,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    radix: 2,
    'space-before-function-paren': [2, 'never'],
    'no-extra-boolean-cast': 0,
    'no-async-promise-executor': 0,
    'standard/no-callback-literal': 0,

    /**
     * vue
     */
    'vue/html-self-closing': [2, {
      html: {
        void: 'any',
        normal: 'any',
        component: 'any'
      },
      svg: 'any',
      math: 'any'
    }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-duplicate-attributes': 0
  }
}
