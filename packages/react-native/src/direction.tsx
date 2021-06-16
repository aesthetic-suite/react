import React from 'react';
import { View } from 'react-native';
import { createDirectionHelpers } from '@aesthetic/core-react';
import { aesthetic } from './aesthetic';

function DirectionWrapper({ children, ...props }: { children: React.ReactNode }) {
	return (
		<View testID="aesthetic-direction-provider" {...props}>
			{children}
		</View>
	);
}

export const {
	DirectionContext,
	DirectionProvider,
	useDirection,
	withDirection,
} = createDirectionHelpers(aesthetic, { wrapper: DirectionWrapper });
