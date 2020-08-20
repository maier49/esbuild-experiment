import esbuild from 'rollup-plugin-esbuild';
import alias from '@rollup/plugin-alias';
import postcss from 'rollup-plugin-postcss-modules';
// import postcssnext from 'postcss-cssnext';
import postcssimport from 'postcss-import';
import html from '@rollup/plugin-html';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/main.ts',
	output: {
		file: 'dist/bundle.js'
	},
	plugins: [
		alias({
			entries: [
				{ find: /(^node_modules[\\/].*\.m\.css$)/, replacement: '$1.js' }
			]
		}),
		nodeResolve(),
		html(),
		commonjs(),
		postcss({
			modules: true,
			inject: true,
			plugins: [postcssimport()],
		}),
		esbuild({
			watch: process.argv.includes('--watch'),
			minify: process.env.NODE_ENV === 'production',
			loaders: {
				'.json': 'json'
			}
		}),
	],
}
