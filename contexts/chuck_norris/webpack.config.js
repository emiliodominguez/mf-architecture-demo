const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfiguration = require("../../webpack.common.js");
const deps = require("../../package.json").dependencies;

module.exports = merge(commonConfiguration, {
	entry: "./src/index",
	devServer: { port: 3003 },
	plugins: [
		new ModuleFederationPlugin({
			name: "chuck_norris",
			filename: "remoteEntry.js",
			exposes: { "./ChuckNorrisContext": "./src/components/ChuckNorrisContext" },
			shared: {
				...deps,
				react: { singleton: true, eager: true, requiredVersion: deps.react },
				"react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] }
			}
		})
	]
});
