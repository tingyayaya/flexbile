const fs = require('fs');

/*
 * @path 写入文件路径
 * @txt  写入内容
 */

function readWrite(path, txt){

  fs.exists(path, function(exists){
    if(exists){
      fs.readFile(path, 'utf8', function (err, data) {
        if(err) console.log(err);
        var test1 = JSON.parse(data);
      })
    }
  })
}
module.exports = write