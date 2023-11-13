import typescript from '@rollup/plugin-typescript'
import styles from 'rollup-plugin-styles'

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [typescript({ tsconfig: 'tsconfig.json' }), styles()],
}
