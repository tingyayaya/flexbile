const fs = require('fs');
const log4js = require('../libs/config/log-config.js');
const path2 = require('path');

/*
 * @path 写入文件路径
 * @data  写入内容
 */

function mkdir(dirpath){
  if(!fs.existsSync(dirpath)){
    fs.mkdir(dirpath, function(err){
      if(err){
        var log_info = log4js.getLogger('info')
        log_info.info(`----${err}----`)
        return false
      }
    })
    return true
  }
  return true
}

function format(data, size){
  var arr = data.map(function(item, index){
    var str = '';
   
    for(var key in item){
      if(item[key]==null){
        var s = 'null'
      }else{
        var s = item[key].toString().replace(/^工号0?/g, '')
      }
      if(key.match(/skf736/gi)){
        var spaceStr = completion(s, 40)
      }else{
        var spaceStr = completion(s, 12)
      }
      
      str += spaceStr
    }
    return str
  })
  return arr.join('\r\n')
}

function completion(str, size){
  var len1 = 0;
  for(var i=0;i<str.length; i++){
    if(/[\u4e00-\u9fa5]/.test(str.charAt(i))){
      len1 +=2
    }else{
      len1 +=1
    }
  }
  var blankSpace = ' '
  var len = size-len1;
  for(var i=0;i<len;i++){
    str += blankSpace;
  }
  return str;
}

function createDocument(path, data){
  data = format(data)
  var filePath = path2.dirname(path)
  var flag = mkdir(filePath);
  if(flag){

    fs.exists(path, function(exists){
      if(exists){
        var log_info = log4js.getLogger('info')
        log_info.info(`----文件已存在，不在重复写入----`)
        return;
      }else{
         
        fs.writeFile(path, data, function(err){
          
          if(err){
            var log_info = log4js.getLogger('info')
            log_info.info(`----${err}----`)
            //console.log(`----${err}----`)
            return false;
          }else{
            //console.log('----写入成功----')
            var log_info = log4js.getLogger('info')
            log_info.info('----写入成功----')
            log4js.getLogger()
          }
        })
      }
    })

  }
}

module.exports = createDocument