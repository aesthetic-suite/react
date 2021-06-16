import { Aesthetic, ClassName, ElementStyles } from '@aesthetic/core';
import { createClientEngine } from '@aesthetic/style';
import { isDOM } from '@aesthetic/utils';

export const aesthetic = new Aesthetic<ClassName, ElementStyles>();

// Avoid creating the client on the server
if (isDOM()) {
	aesthetic.configureEngine(createClientEngine());
}
