import { Aesthetic, ClassName, Rule } from '@aesthetic/core';
import { createClientEngine } from '@aesthetic/style';
import { isDOM } from '@aesthetic/utils';

export const aesthetic = new Aesthetic<Rule, ClassName>();

// Avoid creating the client on the server
if (isDOM()) {
	aesthetic.configureEngine(createClientEngine());
}
