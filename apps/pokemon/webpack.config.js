const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfiguration = require("../../webpack.common.js");
const deps = require("../../package.json").dependencies;

module.exports = merge(commonConfiguration, {
	entry: "./src/index",
	devServer: { port: 3001 },
	plugins: [
		new ModuleFederationPlugin({
			name: "pokemon",
			filename: "remoteEntry.js",
			exposes: { "./Pokemon": "./src/components/App" },
			remotes: { ui: "ui@http://localhost:3003/remoteEntry.js" },
			shared: {
				...deps,
				react: { singleton: true, eager: true, requiredVersion: deps.react },
				"react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] }
			}
		})
	]
});
