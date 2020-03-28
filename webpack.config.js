const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
	context: ROOT,
	
	entry: {
		'main': './main.ts'
	},
	
	output: {
		filename: '[name].bundle.js',
		path    : DESTINATION
	},
	
	plugins: [new HtmlWebpackPlugin({
		template: 'index.html'
	})],
	
	resolve: {
		extensions: ['.ts', '.js'],
		modules   : [
			ROOT,
			'node_modules'
		]
	},
	
	module: {
		rules: [
			/****************
			 * PRE-LOADERS
			 *****************/
			{
				enforce: 'pre',
				test   : /\.js$/,
				use    : 'source-map-loader'
			},
			{
				enforce: 'pre',
				test   : /\.ts$/,
				exclude: /node_modules/,
				use    : 'tslint-loader'
			},
			
			/****************
			 * LOADERS
			 *****************/
			{
				test   : /\.ts$/i,
				exclude: [/node_modules/],
				use    : 'awesome-typescript-loader'
			},
			{
				test: /\.css$/i,
				use : ['style-loader', 'css-loader']
			},
			{
				test: /\.(?:ttf|otf)$/i,
				use : 'file-loader'
			},
			{
				test   : /\.(?:png|svg|jpg|gif)$/i,
				loader : 'file-loader',
				options: {
					outputPath: 'assets/textures/blocks/',
					name      : '[name].[ext]'
				}
			},
			
			{
				test: /\.html$/i,
				use : 'html-loader'
			}
		]
	},
	
	devtool  : 'cheap-module-source-map',
	devServer: {}
};

