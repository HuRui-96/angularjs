var fs = require("fs");
var zlib = require('zlib');


fs.createReadStream('./floder/2.wmv.zip')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('./floder/3.wmv'));
  
console.log("文件解压完成。");