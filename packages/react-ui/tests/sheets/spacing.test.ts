import { renderStyleSheet } from '@aesthetic/react';
import { spacingStyleSheet } from '../../src/sheets/spacing';
import { getRenderedStyles, withStyles } from '../helpers';

describe('spacing', () => {
	it(
		'renders styles',
		withStyles(() => {
			renderStyleSheet(spacingStyleSheet);

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);
});
