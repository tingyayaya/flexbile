const mysqlHelper = require('../db/mysql-helper')

const myOrder = {
  async getOrderByInst (args){
    let sql = `SELECT * FROM skt3 WHERE skf84 = ${args.inst} AND skf41 = ${args.type}`
    
    let result = await mysqlHelper.query(sql)
    return result
  }
}

module.exports = myOrder