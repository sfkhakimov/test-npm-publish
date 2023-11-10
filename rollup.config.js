import babel from 'rollup-plugin-babel'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'

export default {
    input: 'src/index.ts',
    output: {
        file: 'lib/test-npm-publish.min.js',
        format: 'iife',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
        }),
        typescript(),
        css(),
    ],
}
