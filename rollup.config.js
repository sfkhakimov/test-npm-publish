import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

const plugins = () => [
    babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.jsx', 'ts', 'tsx', '.es6', '.es', '.mjs']
    }),
    typescript()
];

export default {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
    },
    plugins: [...plugins()],
};
