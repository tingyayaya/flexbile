const path = require('path')
const schedule = require('node-schedule');
const log4js = require('./libs/config/log-config')

const mydataSkt46 = require('./libs/model/data-skt46')
const mydataSkt52 = require('./libs/model/data-skt52')
const getDate = require('./common/date')
const createDocument = require('./common/createDocument')

var times = [];
var rule = new schedule.RecurrenceRule();



for(var i=1; i<60; i++){
  times.push(i)
}
rule.hour = times     //每小时执行一次
//rule.second = times    //每秒执行一次
//rule.minute = times    //每分钟执行一次

schedule.scheduleJob(rule, function(){
  
  //skt46
  mydataSkt46.getMyData().then(function(data){
    if(data){
      const fileName = 'SDS-EMP_'+getDate();
      const ROOT_PATH = path.resolve(__dirname, 'file/SDS-EMP', fileName+'.txt');
      createDocument(ROOT_PATH, data)
    }
  }, function(error){
    var log_info = log4js.getLogger('info');
    log_info.info(`----${error}----`)
  })
  //skt52
  mydataSkt52.getMyData().then(function(data){
    if(data){
      const fileName = 'SDS-PRE_'+getDate()
      const ROOT_PATH = path.resolve(__dirname, 'file/SDS-PRE', fileName+'.txt');
      createDocument(ROOT_PATH, data)
    }
  }, function(error){
    var log_info = log4js.getLogger('info');
    log_info.info(`----${error}----`)
  })

})


