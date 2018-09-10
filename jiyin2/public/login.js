const opt = require('../common/opt');
const request = require('request');
const SignUtils = require('../common/SignUtils');



/*
 * @pass 请求参数
 * @callback 回调函数 两个参数
 */

function login(pass, callback){
  pass.sign = SignUtils.getSign(pass)

    request({
      url: `${opt.host}/partner/login`,
      method: "POST",
      json: true,
      headers: {
          "content-type": "application/json;charset=UTF-8",
      },
      body: pass
    }, function(error, response, body) {
      callback(body, response.headers);
    })
  
}

module.exports = login


