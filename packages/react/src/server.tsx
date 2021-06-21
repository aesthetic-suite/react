import React from 'react';
import type { StyleEngine } from '@aesthetic/style';
import { extractCssFromSheet, getStyleElementAttributes } from '@aesthetic/style/server';
import type { Sheet, SheetType } from '@aesthetic/types';

export * from '@aesthetic/style/server';

interface SheetProps {
	ruleCount: number;
	sheet: Sheet;
	type: SheetType;
}

function Style({ ruleCount, sheet, type }: SheetProps) {
	return (
		<style {...getStyleElementAttributes(type, sheet, ruleCount)}>
			{extractCssFromSheet(sheet)}
		</style>
	);
}

export function renderToStyleElements(engine: StyleEngine): JSX.Element {
	return (
		<>
			<Style ruleCount={engine.ruleCount} sheet={engine.sheetManager.sheets.global} type="global" />

			<Style
				ruleCount={engine.ruleCount}
				sheet={engine.sheetManager.sheets.standard}
				type="standard"
			/>

			<Style
				ruleCount={engine.ruleCount}
				sheet={engine.sheetManager.sheets.conditions}
				type="conditions"
			/>
		</>
	);
}
