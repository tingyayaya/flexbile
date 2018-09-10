const fs = require('fs');

/*
 * @path 写入文件路径
 * @txt  写入内容
 */

function write(path, txt){
  txt = txt+'\r\n';

  fs.exists(path, function(exists){
    if(exists){
      fs.appendFile(path, txt, function(err){
        if(err){
          return false;
        }else{
          console.log('----写入成功----')
        }
      })
    }else{
      fs.mkdir(path, function(err){
        if(err){
          return false
        }else{
          fs.appendFile(path, txt, function(err){
            if(err){
              return false;
            }else{
              console.log('----写入成功----')
            }
          })
        }
      })
    }
  })
}
module.exports = write