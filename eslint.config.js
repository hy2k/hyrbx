import {
	baseConfig,
	ignores,
	importConfig,
	perfConfig,
	robloxConfig,
	sortConfig,
	testConfig,
} from 'eslint-config-y2';

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
