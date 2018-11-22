const request = require('request');
const SignUtils = require('../common/SignUtils');
const opt = require('../common/opt')
const write = require('../common/fileWrite')
const objKeySort = require('../common/objKeySort')

/*
 * 交易创建
 * @pass 请求参数
 * @passport 登录通行证
 */

function createTrade(pass, passport, callback){
  
  //排序
  var sortArr = objKeySort(pass)
  
  //获取签名
  pass.sign = SignUtils.getSign(sortArr)
  
  request({
    url: `${opt.host}/partner/trade/create`,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json;charset=UTF-8",
        "passport": passport
    },
    body: pass
  }, function(error, response, body) {
    
    callback(body, response.headers)
    
    if (!error && response.statusCode == 200) {
      //数据写入文档
      write('../file/createTrade.txt', JSON.stringify(pass))
    }
  }); 

}

module.exports = createTrade