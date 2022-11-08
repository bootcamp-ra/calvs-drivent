module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:boundaries/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "boundaries"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "extends": ["plugin:boundaries/recommended"],
    "boundaries/ignore": ["**/tests/"],
    "boundaries/elements": [
      {
        "type": "controllers",
        "pattern": "src/controllers"
      },
      {
        "type": "services",
        "pattern": "src/services",
      },
      {
        "type": "middlewares",
        "pattern": "src/middlewares",
      },
      {
        "type": "repositories",
        "pattern": "src/repositories",
      },
      {
        "type": "routers",
        "pattern": "src/routers",
      },
      {
        "type": "config",
        "pattern": "src/config",
      } 
    ]
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "comma-spacing": ["error", { before: false, after: true }],
    "semi-spacing": ["error", { before: false, after: true }],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", { beforeColon: false }],
    "padded-blocks": ["error", "never"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "space-before-blocks": ["error", "always"],
    "eol-last": ["error", "always"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
    ],
    "@typescript-eslint/type-annotation-spacing": ["error", { after: true, before: false }],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": "warn",
    "boundaries/element-types": [2, {
      "default": "disallow",
      "message": "${file.type} não podem importar ${dependency.type}",
      "rules": [
        {
          "from": ["controllers"],
          "allow": ["services", "middlewares"],
        },
        {
          "from": ["middlewares"],
          "allow": ["services", "controllers", "config"],
        },
        {
          "from": ["services"],
          "allow": ["repositories"],
        },
        {
          "from": ["routers"],
          "allow": ["controllers", "middlewares"],
        },
        {
          "from": ["repositories"],
          "allow": ["config"],
        },
      ]
    }]
  }
};
