import path from 'path'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

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
            '@babel/preset-env',
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
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        ['@babel/transform-runtime', { regenerator: false, useESModules }]
    ],
})

export default [
    {
        input: `./src/index.tsx`,
        output: { file: `dist/index.js`, format: 'esm', exports: 'auto' },
        external,
        plugins: [babel(getBabelOptions({ useESModules: true })), resolve({ extensions })],
    },
    {
        input: `./src/index.tsx`,
        output: { file: `dist/index.cjs.js`, format: 'cjs', exports: 'auto' },
        external,
        plugins: [babel(getBabelOptions({ useESModules: false })), resolve({ extensions })],
    },
    {
        input: `./src/react.ts`,
        output: { file: `dist/react.js`, format: 'esm', exports: 'auto'},
        external,
        plugins: [babel(getBabelOptions({ useESModules: true })), resolve({ extensions })],
        preserveModules: true
    },
    {
        input: `./src/react.ts`,
        output: { file: `dist/react.cjs.js`, format: 'cjs', exports: 'auto'},
        external,
        plugins: [babel(getBabelOptions({ useESModules: false })), resolve({ extensions })],
        preserveModules: true
    },
]