import { renderStyleSheet } from '@aesthetic/react';
import { shadowStyleSheet } from '../../src/sheets/shadows';
import { getRenderedStyles, withStyles } from '../helpers';

describe('shadows', () => {
	it(
		'renders styles',
		withStyles(() => {
			renderStyleSheet(shadowStyleSheet);

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);
});
