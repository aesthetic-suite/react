import { renderStyleSheet } from '@aesthetic/react';
import { borderStyleSheet } from '../../src/sheets/borders';
import { getRenderedStyles, withStyles } from '../helpers';

describe('borders', () => {
	it(
		'renders styles',
		withStyles(() => {
			renderStyleSheet(borderStyleSheet);

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);
});
