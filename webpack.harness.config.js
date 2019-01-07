const config = require("./webpack.config");

module.exports = {
	...config,
	entry: "./pages/index.js",
	mode: "development",
	devServer: {
		contentBase: "./pages",
		publicPath: "/assets/",
	},
};
