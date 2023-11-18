import path from 'path'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const root = process.platform === 'win32' ? path.resolve('/') : '/'
const external = (id) => !id.startsWith('.') && !id.startsWith(root)
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json']

const getBabelOptions = ({ useESModules }) => ({
    babelrc: false,
    extensions,
    exclude: '**/node_modules/**',
    babelHelpers: 'runtime',
    presets: [
        [
            {
                include: [
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                    '@babel/plugin-proposal-numeric-separator',
                    '@babel/plugin-proposal-logical-assignment-operators',
                ],
                bugfixes: true,
                loose: true,
                modules: false,
                targets: '> 1%, not dead, not ie 11, not op_mini all',
            },
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@babel/transform-runtime', { regenerator: false, useESModules }]
    ],
})

export default [
    {
        input: `./src/index.ts`,
        output: { file: `dist/index.js`, format: 'esm', exports: 'auto' },
        external,
        plugins: [babel(getBabelOptions({ useESModules: true }, '>1%, not dead, not ie 11, not op_mini all')), resolve({ extensions })],
        preserveModules: true
    },
    {
        input: `./src/index.ts`,
        output: { file: `dist/index.cjs.js`, format: 'cjs', exports: 'auto' },
        external,
        plugins: [babel(getBabelOptions({ useESModules: false })), resolve({ extensions })]
    },
    {
        input: `./src/types.ts`,
        output: { file: `dist/types.js`, format: 'esm', exports: 'auto' },
        external,
        plugins: [babel(getBabelOptions({ useESModules: true }, '>1%, not dead, not ie 11, not op_mini all')), resolve({ extensions })],
        preserveModules: true
    },
    {
        input: `./src/types.ts`,
        output: { file: `dist/types.cjs.js`, format: 'cjs', exports: 'auto' },
        external,
        plugins: [babel(getBabelOptions({ useESModules: false })), resolve({ extensions })]
    },
    {
        input: `./src/r3f.ts`,
        output: { file: `dist/r3f.js`, format: 'esm', exports: 'auto'},
        external,
        plugins: [babel(getBabelOptions({ useESModules: true }, '>1%, not dead, not ie 11, not op_mini all')), resolve({ extensions })],
        preserveModules: true
    },
    {
        input: `./src/r3f.ts`,
        output: { file: `dist/r3f.cjs.js`, format: 'cjs', exports: 'auto'},
        external,
        plugins: [babel(getBabelOptions({ useESModules: false })), resolve({ extensions }), terser()]
    },
]