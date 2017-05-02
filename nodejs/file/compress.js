//压缩文件
var fs = require('fs');
var zlib = require('zlib');


fs.createReadStream('./floder/2.wmv')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./floder/2.wmv.zip'));

console.log('文件压缩完毕');
