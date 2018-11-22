const login = require('./login')

const findState = require('./findStateTrade')
const createTrade = require('./createTrade')
const jsonString = require('../common/jsonString')
const SignUtils = require('../common/SignUtils')
const updateTrade = require('./updateTrade')
const createSample = require('./createSample')

//1. 权限接口
var loginpass = {
  "openKey":"93319a4441fae08309390fd2e8326002",
  "openSecret":"b842f1db09ef1bfda2ae1c1f70ec57c7"
}

//2.1.1交易创建
var tradecreatepass = {
    "sampleCode":"xxx",
    "itemId":"PT473085982111956992", 
    "code":"3018072821219", 
    "buyerPhone":"18857121799", 
    "totalPrice": '699.0',
    "totalAmount":'699.0',
    "fundAmount":'699.0',
    "receiver":"叶伟标", 
    "receiverPhone":"18857121799", 
    "receiverProvince":"440000", 
    "receiverCity":"440300", 
    "receiverRegion":"440306", 
    "receiverAddress":"远方科技中心15楼壹基因",
}

//2.1.2根据交易查询样本状态
var tradefindstatepass = {
  "code":"3018072821218",
}

//2.1.3交易状态更新
var tradeupdatepass = {
  "state":"ARRIVED",
  "code":"3018072821219",
  "tradeId": ''
}

//3.1同步
var createsamplepass = {
  "itemId":"PT473085982111956992", 
  "code":"xxxx",
  "name":"德采测试",
  "phone":"18857121799", 
  "gender":"MALE", 
  "birthYear":1994, 
  "birthMonth":10,
  "birthDay":5,
}

// login(loginpass, function(data, header){
//   console.log(data)
//   console.log(header)
// })


var passPort = 'eyJhbGciOiJIUzI1NiJ9.eyJwYXJ0bmVySWQiOiJQNDc3NDk1ODAyMzExMzQ0MTI4IiwiaWF0IjoxNTM2ODk2MTExLCJ0aW1lc3RhbXAiOjE1MzY4OTYxMTEyNjJ9.IpD1KoSBdAxV_Y3yGcoauNu6vOvfxS_i0EtzJBZ2l_k';

// createTrade(tradecreatepass,passPort, function(data){
//   console.log('交易创建'+data)
// })




// updateTrade(tradeupdatepass, passPort, function(data){
//   console.log('交易状态更新'+data)
// })

// createSample(createsamplepass, passPort, function(data){
//   console.log('样本同步'+data)
// })


findState(tradefindstatepass, passPort, function(data){
  console.log('交易查询样本状态'+data)
})