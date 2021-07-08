import { renderStyleSheet } from '@aesthetic/react';
import { textStyleSheet } from '../../src/sheets/text';
import { getRenderedStyles, withStyles } from '../helpers';

describe('text', () => {
	it(
		'renders styles',
		withStyles(() => {
			renderStyleSheet(textStyleSheet);

			expect(getRenderedStyles('standard')).toMatchSnapshot();
		}),
	);
});
