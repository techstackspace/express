import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "dist/**"],
  },
  {
    files: ["src/**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        myCustomGlobal: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": ["@typescript-eslint"]
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];