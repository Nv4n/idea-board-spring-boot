// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"plugin:@tanstack/eslint-plugin-query/recommended"
			],
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: path.join(__dirname, "tsconfig.json"),
			},
		},
	],
	root: true,
	env: { browser: true, es2020: true },

	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: path.join(__dirname, "tsconfig.json"),
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"@tanstack/query/exhaustive-deps": "error",
    	"@tanstack/query/no-rest-destructuring": "warn",
    	"@tanstack/query/stable-query-client": "error", 
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ argsIgnorePattern: "^_",
			varsIgnorePattern: "^_",
			caughtErrorsIgnorePattern: "^_" },
			
		],
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: {
					arguments: false,
					attributes: false,
				},
			},
		],
		"no-console": "warn",
	},
};
