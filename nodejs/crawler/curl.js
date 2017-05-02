var http = require('http');


function download(url,callback){
	http.get(url,function(res){
		var resData = '';
		res.on('data',function(data){
			resData += data;
		});
		res.on('end',function(){
			callback(resData);
		})
	}).on('error',function(){
		callback(null);
	})
}

exports.download = download;
