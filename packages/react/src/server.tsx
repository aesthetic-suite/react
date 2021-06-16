import React from 'react';
import type { StyleEngine } from '@aesthetic/style';
import { extractCssFromSheet, getStyleElementAttributes } from '@aesthetic/style/server';
import type { Sheet, SheetType } from '@aesthetic/types';

export * from '@aesthetic/style/server';

interface SheetProps {
	ruleIndex: number;
	sheet: Sheet;
	type: SheetType;
}

function Style({ ruleIndex, sheet, type }: SheetProps) {
	return (
		<style {...getStyleElementAttributes(type, sheet, ruleIndex)}>
			{extractCssFromSheet(sheet)}
		</style>
	);
}

export function renderToStyleElements(engine: StyleEngine): JSX.Element {
	return (
		<>
			<Style ruleIndex={engine.ruleIndex} sheet={engine.sheetManager.sheets.global} type="global" />

			<Style
				ruleIndex={engine.ruleIndex}
				sheet={engine.sheetManager.sheets.standard}
				type="standard"
			/>

			<Style
				ruleIndex={engine.ruleIndex}
				sheet={engine.sheetManager.sheets.conditions}
				type="conditions"
			/>
		</>
	);
}
