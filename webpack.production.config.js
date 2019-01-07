const config = require("./webpack.config");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	...config,
	mode: "production",
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
};
