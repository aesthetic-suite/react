/* eslint-disable sort-keys */

module.exports = {
	overrides: [
		{
			files: 'styles.ts',
			rules: {
				'no-magic-numbers': 'off',
				'sort-keys': 'off',
			},
		},
	],
	rules: {
		'react/forbid-prop-types': 'off',
		'react/no-unused-prop-types': 'off',
		'react/prop-types': 'off',
		'react/require-default-props': 'off',

		// Broken
		'no-use-before-define': 'off',
	},
};
