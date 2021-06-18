import { Rule } from '@aesthetic/react';
import { arrayLoop } from '@aesthetic/utils';

export function mapVariants<T>(
	type: string,
	enums: T[],
	factory: (value: T, typeName: string) => Rule,
) {
	const object: Partial<Record<string, Rule>> = {};

	arrayLoop(enums, (value) => {
		object[`${type}:${value}`] = factory(value, type);
	});

	return object as Record<string, Rule>;
}
