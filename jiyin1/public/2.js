const path = require('path')
const myOrder = require('../libs/model/myOrder')
const sampleState = require('../common/sampleState')

const login = require('./login')
const findState = require('./findStateTrade')
const createTrade = require('./createTrade')
const updateTrade = require('./updateTrade')
const createSample = require('./createSample')

const xlsxFile = require('../common/xlsxFile')


//登录参数
const LOGIN_PASS = {
  "openKey":"93319a4441fae08309390fd2e8326002",
  "openSecret":"b842f1db09ef1bfda2ae1c1f70ec57c7"
}

//表格路径
const ROOT_PATH = path.resolve(__dirname, '../file', '1.xlsx');

/**
 * 写入xlsx
 * 
 * 查询晨科数据 一基因 检测中 
 * 登陆一基因 创建订单 和 同步样本
 */
myOrder.getOrderByInst({inst: 3, type: 150}).then(function(data){
  //const orderData = data;

  var orderData = data.slice(5,6);

  //xlsxFile.xlsxReadWrite(ROOT_PATH, orderData)
   
  //读取文件内容 或者新建文件
  var xlsxData = xlsxFile.xlsxRead(ROOT_PATH);
  console.log(xlsxData)

  

  //登录
  login(LOGIN_PASS, function(data, header){
    var passPort;

    if(data.success){
      passPort = header.passport;
    }

    orderData.forEach(function(item, index){
      
      //交易参数
      let tradecreatepass = {
        "sampleCode":"xxx",
        "itemId": item['SKF28'], 
        "code": item['SKF42'], 
        "buyerPhone": item['SKF56'], 
        "totalPrice": '699.0',
        "totalAmount":'699.0',
        "fundAmount":'699.0',
        "receiver": item['SKF30'], 
        "receiverPhone": item['SKF31'], 
        "receiverProvince": "440000", 
        "receiverCity": "440300", 
        "receiverRegion": "440306", 
        "receiverAddress": item["SKF36"]
      }

      //样本参数
      let samplecreatepass = {
        "itemId": item['SKF28'], 
        "name": item['SKF30'],
        "code": item['SKF42'], 
        "phone": item['SKF31'], 
        "gender": item['SKF86'],
        "birthYear": item['SKF87'], 
        "birthMonth": item['SKF87'],
        "birthDay": 1,
      }
      
     
      createTrade(tradecreatepass, passPort, function(data){
        //console.log('交易创建'+data)
      })
      
      createSample(samplecreatepass, passPort, function(data){
        //console.log('样本同步'+data)
        if(data.success){
          //样本创建成功 则写人表格
          xlsxData.push(item);
          xlsxFile.xlsxReadWrite(ROOT_PATH, xlsxData);
        }
      })

    })
    
  })
 
})

/**
 * 查询修改xlsx中的数据状态
 * 
 * 登录
 * 轮循获取一基因状态
 * 订单状态修改 写入1.xlsx
 */

login(LOGIN_PASS, function(data, header){
  var passPort;
  if(data.success){
    passPort = header.passport;
  }

  //每个5分钟查询一次
  var timer = setInterval(() => {
        //读取XLSX文件内容 json数据
      var arys = xlsxFile.xlsxRead(ROOT_PATH);

      arys.forEach(item => {
        var tradefindstatepass = {
          "code":item['SKF42[订单编号]'],
        }
        findState(tradefindstatepass, passPort, function(data){
          if(data.success){
            //样本状态 == "报告已生成"
            if(data.data.state == 'REPORTED'){  
              item['SKF41[订单状态]'] = sampleState['REPORTED']
            }
          }
        })
      })

      //重新写人表格
      xlsxFile.xlsxReadWrite(ROOT_PATH, arys)
  }, 50000);
  
})
