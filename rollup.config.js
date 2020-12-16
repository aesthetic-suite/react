import path from 'path';
import externals from 'rollup-plugin-node-externals';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const babelConfig = require('./babel.config');

// Order is imporant!
const packages = ['core-react', 'react', 'react-ui'];
const targets = [];

const extensions = ['.ts', '.tsx', '.js', '.jsx'];
const webPlugins = [
  resolve({ extensions }),
  babel({
    ...babelConfig,
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions,
  }),
];

packages.forEach((pkg) => {
  targets.push({
    input: `packages/${pkg}/src/index.ts`,
    output: [
      {
        file: `packages/${pkg}/lib/index.js`,
        format: 'cjs',
      },
      {
        file: `packages/${pkg}/esm/index.js`,
        format: 'esm',
      },
    ],
    plugins: [
      externals({
        deps: true,
        packagePath: path.resolve(`packages/${pkg}/package.json`),
      }),
      ...webPlugins,
    ],
  });
});

export default targets;
