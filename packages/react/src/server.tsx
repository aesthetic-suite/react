import React from 'react';
import { formatDeclarationBlock, StyleEngine } from '@aesthetic/style';
import type { Sheet, SheetType } from '@aesthetic/types';

export * from '@aesthetic/style/server';

interface SheetProps {
  ruleIndex: number;
  sheet: Sheet;
  type: SheetType;
}

function Style({ ruleIndex, sheet, type }: SheetProps) {
  const lastIndex = sheet.cssRules.length - 1;

  // TODO switch to extractCssFromSheet when available
  let css = '';

  if (Object.keys(sheet.cssVariables).length > 0) {
    css += `:root { ${formatDeclarationBlock(sheet.cssVariables)} }`;
  }

  css += sheet.cssText;

  return (
    <style
      id={`aesthetic-${type}`}
      type="text/css"
      media="screen"
      data-aesthetic-type={type}
      data-aesthetic-hydrate-index={lastIndex}
      data-aesthetic-rule-index={ruleIndex}
    >
      {css}
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
