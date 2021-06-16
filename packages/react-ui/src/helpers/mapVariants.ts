import { ElementStyles } from '@aesthetic/react';
import { arrayLoop } from '@aesthetic/utils';

export function mapVariants<T>(
	type: string,
	enums: T[],
	factory: (value: T, typeName: string) => ElementStyles,
) {
	const object: Partial<Record<string, ElementStyles>> = {};

	arrayLoop(enums, (value) => {
		object[`${type}:${value}`] = factory(value, type);
	});

	return object as Record<string, ElementStyles>;
}
