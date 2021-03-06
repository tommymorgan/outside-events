module.exports = {
	entry: "./src/outside-events.js",
	mode: "development",
	module: {
		rules: [{
			test: /\.less$/,
			use: [{
				loader: "style-loader" // creates style nodes from JS strings
			}, {
				loader: "css-loader" // translates CSS into CommonJS
			}, {
				loader: "less-loader" // compiles Less to CSS
			}]
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader",
		}],
	},
	output: {
		library: "outside-events",
		libraryTarget: "umd",
	},
};
