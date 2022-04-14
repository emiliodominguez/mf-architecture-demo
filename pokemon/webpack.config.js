const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
	mode: "development",
	devServer: { port: 3001 },
	entry: "./src/index",
	devtool: "source-map",
	resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".json"] },
	module: {
		rules: [
			// Javascript
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"]
				}
			},
			// Typescript
			{
				test: /\.(ts|tsx)$/,
				use: "ts-loader",
				exclude: [/node_modules/]
			},
			// CSS
			{
				test: /\.(c|sc|sa)ss$/,
				use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"]
			}
		]
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "pokemon",
			filename: "remoteEntry.js",
			exposes: { "./Pokemon": "./src/components/App" }
		}),

		new HtmlWebpackPlugin({
			filename: "./index.html",
			template: "./public/index.html"
		}),

		new MiniCSSExtractPlugin(),

		new InterpolateHtmlPlugin({ PUBLIC_URL: "public" })
	]
};
