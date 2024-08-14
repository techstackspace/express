import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ),
    {
        files: ["**/*.ts", "**/*.js"],
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier: prettierPlugin
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": ["error", { allow: ["warn", "error"] }],
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "prettier/prettier": "error"
        },
        settings: {
            prettier,
        },
    },
];
