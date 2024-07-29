import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: [
      ".config/*",
      "*.config*",
      "**/shared/modules/HEXPicker",
      "*.d.ts",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: [
          "./tsconfig.json",
          "./tsconfig.node.json",
          "./tsconfig.app.json",
        ],
        tsconfigRootDir: "./",
      },
    },
  },
  {
    // in main config for TSX/JSX source files
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },

  {
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": ["off"],
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "no-alert": "warn",
      "no-debugger": "warn",
      "no-console": "warn",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/restrict-plus-operands": "warn",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-misused-promises": "warn",
      "no-constant-condition": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "no-empty-pattern": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]
