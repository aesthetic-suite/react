module.exports = {
	stories: ['../packages/*/stories/**/*.story.@(ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			customComponentTypes: ['DynamicComponent', 'StyledComponent'],
			shouldExtractLiteralValuesFromEnum: true,
			shouldRemoveUndefinedFromOptional: true,
			// Hide props inherited from React/DOM
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},
};
