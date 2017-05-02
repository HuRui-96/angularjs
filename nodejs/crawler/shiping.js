var cheerio = require('cheerio');
var server = require('./curl');
var url = "http://open.163.com/special/opencourse/englishs1.html";
var url2 = "http://www.mzitu.com/zipai/comment-page-1/";

server.download(url, function(data) {
  if (data) {
    //console.log(data);
 
    var $ = cheerio.load(data);
    //console.log(data);
    //console.log($('h1').html())
     $(".u-ctitle a").each(function(i, e) {
        console.log($(e).attr("href"));
    });
 
    console.log("done");
  } else {
      console.log("error");
  } 
});
