const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfiguration = require("../../webpack.common.js");
const deps = require("../../package.json").dependencies;

module.exports = merge(commonConfiguration, {
	entry: "./src/index",
	devServer: {
		port: 3000,
		historyApiFallback: true,
		hot: true
	},
	output: { publicPath: "/" },
	optimization: { runtimeChunk: "single" },
	plugins: [
		new ModuleFederationPlugin({
			name: "main",
			filename: "remoteEntry.js",
			remotes: {
				pokemon: "pokemon@http://localhost:3001/remoteEntry.js",
				rick_and_morty: "rick_and_morty@http://localhost:3002/remoteEntry.js",
				ui: "ui@http://localhost:3003/remoteEntry.js"
			},
			shared: {
				...deps,
				react: { singleton: true, eager: true, requiredVersion: deps.react },
				"react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] }
			}
		})
	]
});
