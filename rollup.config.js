import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'
import importCss from 'rollup-plugin-import-css'
import styles from 'rollup-plugin-styles'

export default {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [typescript({ tsconfig: 'tsconfig.json' }), styles()],
}
