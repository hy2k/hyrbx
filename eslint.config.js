import { baseConfig, ignores, importConfig, perfConfig, robloxConfig, sortConfig, testConfig } from 'eslint-config-y2';

robloxConfig.languageOptions.parserOptions = {
	...robloxConfig.languageOptions.parserOptions,
	project: '**/tsconfig.json',
};

testConfig.files?.push('**/test.server.ts');

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	//
	ignores,
	baseConfig,
	robloxConfig,
	importConfig,
	testConfig,
	sortConfig,
	perfConfig,
];
