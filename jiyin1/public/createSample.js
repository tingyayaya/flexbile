const request = require('request');
const SignUtils = require('../common/SignUtils');
const opt = require('../common/opt')
const write = require('../common/fileWrite')
const objKeySort = require('../common/objKeySort')

/*
 * 样本 同步
 * @pass 请求参数
 * @passport 登录通行证
 */

function createTrade(pass, passport, callback){
  
  //排序
  var sortArr = objKeySort(pass)
  
  //获取签名
  pass.sign = SignUtils.getSign(sortArr)
  
  request({
    url: `${opt.host}/partner/sample/create`,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json;charset=UTF-8",
        "passport": passport
    },
    body: pass
  }, function(error, response, body) {
    
    callback(body, response.headers)
    
  }); 

}

module.exports = createTrade