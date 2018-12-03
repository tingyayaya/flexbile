const mysqlHelper = require('../db/mysql-helper')
const config = require('../config/mysql-config.js')
var skt = config.sktName
const myData = {
  async getMyData (args){
    let sql = `SELECT SKF735,SKF736,SKF826,SKF827,SKF828,SKF740 FROM skt46`
    let result = await mysqlHelper.query(sql);
    return result
  }
}

module.exports = myData