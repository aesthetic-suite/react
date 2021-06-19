# Aesthetic - React Native Integration

[![Build Status](https://github.com/aesthetic-suite/react/workflows/Build/badge.svg)](https://github.com/aesthetic-suite/react/actions?query=branch%3Amaster)
[![npm version](https://badge.fury.io/js/%40aesthetic%react-native.svg)](https://www.npmjs.com/package/@aesthetic/react-native)
[![npm deps](https://david-dm.org/aesthetic-suite/react.svg?path=packages/react-native)](https://www.npmjs.com/package/@aesthetic/react-native)

Provides styles for React Native components through hook or HOC based APIs. Built around the
powerful [Aesthetic](https://github.com/aesthetic-suite/framework) core library.

```tsx
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { createComponentStyles, useStyles } from '@aesthetic/react-native';

export const styleSheet = createComponentStyles((theme) => ({
	button: {
		flex: 1,
		flexWrap: 'nowrap',
		alignItems: 'center',
		width: 'auto',
		padding: theme.tokens.spacing.df,
	},

	button_block: {
		width: '100%',
	},
}));

export interface ButtonProps extends PressableProps {
	children: React.ReactNode;
	block?: boolean;
}

export default function Button({ children, block = false, ...props }: ButtonProps) {
	const sx = useStyles(styleSheet);

	return (
		<Pressable {...props} style={sx('button', block && 'button_block')}>
			{children}
		</Pressable>
	);
}
```

## Features

- Hook and HOC based APIs for styling components, accessing themes, and handling directionality.
- Element level style sheets and nested themes.
- First-class directionality support (RTL, LTR).

## Requirements

- React 17+
- React Native 0.64+

## Installation

```
yarn add @aesthetic/react-native react react-native
```

## Documentation

[https://aestheticsuite.dev/docs/react-native](https://aestheticsuite.dev/docs/react-native)
