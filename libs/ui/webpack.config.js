const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfiguration = require("../../webpack.common.js");
const deps = require("../../package.json").dependencies;

module.exports = merge(commonConfiguration, {
	entry: "./src/index",
	devServer: { port: 3004 },
	plugins: [
		new ModuleFederationPlugin({
			name: "ui",
			filename: "remoteEntry.js",
			exposes: {
				"./GlobalStyles": "./src/styles/main.scss",
				"./Library/Button": "./src/library/Button",
				"./Library/Table": "./src/library/Table",
				"./Library/Pagination": "./src/library/Pagination",
				"./Library/Spinner": "./src/library/Spinner"
			},
			shared: {
				...deps,
				react: { singleton: true, eager: true, requiredVersion: deps.react },
				"react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] }
			}
		})
	]
});
