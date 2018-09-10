const crypto = require('crypto');
module.exports = {
    MD5_SUFFIX: '0a42ea1d0c9b978dd10169d17c53910f',
    md5: function (text, key){
        var hash = crypto.createHash('md5');
       
        var str = new Buffer(key + text + key).toString('utf8');

        hash.update(str);
        //转base64
        var result = hash.digest('base64');
        return result;
    },
    getSign(options){
      var str = '', sign;
      // 以k1=v1&k2=v2...方式拼接参数
      for(key in options){
        // 过滤空值
        // sign 
        if(options[key]==null||options[key]==undefined||options[key]==''||/^sign$/i.test(key)){
          continue
        }
        str+=`${key}=${options[key]}&`
      }
  
      if(options){
        str = str.substring(0, str.length-1);
      }
      sign = this.md5(str, '0a42ea1d0c9b978dd10169d17c53910f');
      return sign;
    }
}