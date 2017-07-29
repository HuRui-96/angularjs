//引入
//require();
//导出
//module.exports;
module.exports = {
	//入口文件
	entry: "./main.js",
	//导出文件
	output: {
		path: __dirname + "/public",
		filename: "mained.js"
	},
	//加载器
	module:{
		loaders:[{
			test: /\.js$/,
			loader:"babel-loader"
		}]
	}
}