# Aesthetic - React Native Integration

[![Build Status](https://github.com/aesthetic-suite/react/workflows/Build/badge.svg)](https://github.com/aesthetic-suite/react/actions?query=branch%3Amaster)
[![npm version](https://badge.fury.io/js/%40aesthetic%react-native.svg)](https://www.npmjs.com/package/@aesthetic/react-native)
[![npm deps](https://david-dm.org/aesthetic-suite/react.svg?path=packages/react-native)](https://www.npmjs.com/package/@aesthetic/react-native)

Provides styles for React Native components through hook or HOC based APIs. Built around the
powerful [Aesthetic](https://github.com/aesthetic-suite/framework) core library.

```tsx
import React from 'react';
import { View } from 'react-native';
import { createComponentStyles, useStyles } from '@aesthetic/react-native';

export const styleSheet = createComponentStyles((css) => ({
  button: {
    display: 'flex',
    textAlign: 'center',
    width: 'auto',
    padding: css.tokens.spacing.df,
  },

  button_block: {
    width: '100%',
  },
}));

export interface ButtonProps {
  children: React.ReactNode;
  block?: boolean;
}

export default function Button({ children, block = false }: ButtonProps) {
  const sx = useStyles(styleSheet);

  return <View style={sx('button', block && 'button_block')}>{children}</View>;
}
```

## Features

- Hook and HOC based APIs for styling components, accessing themes, and handling directionality.
- Global, document, and element level themes powered through context.
- Nested themes that avoid polluting the global scope.
- First-class directionality support (RTL, LTR).

## Requirements

- React 17+
- React Native 0.64+

## Installation

```
yarn add @aesthetic/react-native react react-native
```

## Documentation

[https://aestheticsuite.dev/docs/integrations/react-native](https://aestheticsuite.dev/docs/integrations/react-native)