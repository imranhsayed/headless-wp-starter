const path = require('path');
const glob = require('glob');
const withOffline = require('next-offline');
const { withPlugins } = require('next-compose-plugins');

module.exports = withOffline({
	webpack: config => {
		config.module.rules.push(
			{
				test: /\.(css|scss)/,
				loader: 'emit-file-loader',
				options: {
					name: 'dist/[path][name].[ext]',
				},
			},
			{
				test: /\.css$/,
				use: ['babel-loader', 'raw-loader', 'postcss-loader'],
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					'babel-loader',
					'raw-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							includePaths: ['styles', 'node_modules']
								.map(d => path.join(__dirname, d))
								.map(g => glob.sync(g))
								.reduce((a, c) => a.concat(c), []),
						},
					},
				],
			},
		);
		return config;
	},
});
