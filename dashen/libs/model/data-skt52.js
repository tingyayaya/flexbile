const mysqlHelper = require('../db/mysql-helper')
const config = require('../config/mysql-config.js')
var skt = config.sktName
const myData = {
  async getMyData (args){
    let sql = `SELECT SKF787,SKF829,SKF789,SKF830,SKF792,SKF793 FROM skt52`
    
    let result = await mysqlHelper.query(sql)
    return result
  }
}

module.exports = myData