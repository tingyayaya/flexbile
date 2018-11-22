const log4js = require('log4js')

log4js.configure({
  appenders: {   //输出
    info: {
      type: 'dateFile', 
      filename: './logs/log',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: [ 'info' ], level: 'info'}
  }
})

module.exports = log4js;