import { renderStyleSheet } from '@aesthetic/react';
import { headingStyleSheet } from '../../src/sheets/heading';
import { getRenderedStyles, withStyles } from '../helpers';

describe('heading', () => {
	it(
		'renders styles',
		withStyles(() => {
			renderStyleSheet(headingStyleSheet);

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);
});
