import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
	{
		ignores: ['eslint.config.mjs', 'dist', 'node_modules'],
	},

	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,

	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
			sourceType: 'module',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			import: importPlugin,
		},
	},

	{
		rules: {
			// =========================
			// TypeScript relaxed
			// =========================
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',

			// =========================
			// Disable formatting rules (use Prettier)
			// =========================
			indent: 'off',
			quotes: 'off',
			semi: 'off',

			// =========================
			// IMPORT SORT ⭐⭐⭐
			// =========================
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'object',
						'type',
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'import/no-duplicates': 'error',

			// =========================
			// Prettier
			// =========================
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					trailingComma: 'all',
					semi: false,
					useTabs: true,
					tabWidth: 2,
					printWidth: 100,
					endOfLine: 'lf',
					arrowParens: 'always',
					bracketSpacing: true,
					bracketSameLine: false,
					quoteProps: 'as-needed',
				},
			],
		},
	},
)
