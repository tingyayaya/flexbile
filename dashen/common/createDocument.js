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

function format(data){
  
  var arr = data.map(function(item, index){
    var str = '';
    for(var key in item){
      var s = item[key];
      if(key.match(/skf736/gi)){
        var spaceStr = completion(s, 43)

      }else if(key.match(/SKF826|SKF829/gi)){
        var spaceStr = completion(s, 8)

      }else if(key.match(/SKF828/gi)){
        var spaceStr = completion(s, 15)

      }else if(key.match(/SKF827/gi)){
        var spaceStr = completion(s, 8, 'right')

      }else if(key.match(/SKF735/gi)){
        s = item[key].toString().replace(/^0/g,'');
        var spaceStr = completion(parseInt(s), 8)

      }else if(key.match(/SKF787/gi)){
        s = item[key].toString().replace(/^0/g,'');
        var spaceStr = completion(parseInt(s), 9)

      }else if(key.match(/SKF789/gi)){
        var spaceStr = completion(s, 1)

      }else if(key.match(/SKF830/gi)){
        var spaceStr = completion(s, 7)

      }else if(key.match(/SKF792/gi)){
        var spaceStr = completion(s, 1)

      }else if(key.match(/SKF793/gi)){
        var spaceStr = completion(s, 3)

      }else {
        var spaceStr = completion(s, 12)
      }
      str += spaceStr
    }
    return str.replace(/\s?$/g, '');
  })
  return arr.join('\r\n')
}

function completion(str, size, type){
  var len1 = 0;

  for(var i=0;i<str.toString().length; i++){
    
    if(/[\u4e00-\u9fa5]/.test(str.toString().charAt(i))){
      len1 +=2
    }else{
      len1 +=1
    }
  }
  
  var blankSpace = ' '
  var blankSpaceStr = "";
  var len = size-len1;
  for(var i=0;i<len;i++){
    blankSpaceStr += blankSpace
  }
  if(type == 'right'){
    str = blankSpaceStr + str;
  }else{
    str += blankSpaceStr
  }
  return str + ' ';
}

function createDocument(path, data){
  data = format(data);
  var filePath = path2.dirname(path)
  var flag = mkdir(filePath);
  if(flag){

    fs.exists(path, function(exists){
      if(exists){
        var log_info = log4js.getLogger('info')
        log_info.info(`----文件已存在，不再重复写入----`)
        return;
      }else{
         
        fs.writeFile(path, '\ufeff'+data, 'utf8', function(err){
          
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