function paramString(params){
  var data = {}
  var str = params.replace(/^{|}$/g, '')
  var temp = str.split(",");
  var len = temp.length
  
  for(var i=0; i<len; i++){
    var arr = temp[0].split(':');
    data[arr[0]] = arr[1]; 
  }
  return data
}

function paramsGet(options){
  var paramArr = options.split('&');
  var res = {};
  for(var i = 0;i<paramArr.length;i++){
      var str = paramArr[i].split('=');
      res[str[0]]=str[1];
  }
  console.log(res)
  return res;
}
module.exports = paramsGet