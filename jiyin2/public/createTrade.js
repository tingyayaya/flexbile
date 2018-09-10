const request = require('request');
const SignUtils = require('../common/SignUtils');
const opt = require('../common/opt')
const jsonString = require('../common/jsonString')
const write = require('../common/fileWrite')

/*
 * @pass 请求参数
 * @passport 登录通行证
 */

function createTrade(pass, passport, callback){
  
  //获取签名的参数
  var temp = jsonString.createTradeJson(pass.trading);
  //参数转字符串
  var contactJson = {};
  contactJson.trading = jsonString.stringConcat(temp);

  //获取签名
  pass.sign = SignUtils.getSign(contactJson)

 
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
      write('../file/createTrade.txt', JSON.stringify(body))
    }
  }); 

}

module.exports = createTrade