var fs = require("fs");

fs.readFile('./floder/v1.doc', function(err, datas) {
	if(err) {
		return console.log(err)
	}
	return console.log(datas.toString());
})