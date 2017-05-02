var fs = require('fs');
//同步读取
console.log("start")
var data = fs.readFileSync('./floder/ajax.html');
console.log(data.toString());//它读取的是html结构
console.log("end")

//异步读取
/*fs.readFile("demo.txt", function(err, data) {
	console.log(data.toString())
})*/

