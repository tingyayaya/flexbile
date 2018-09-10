const mysqlHelper = require('./../db/mysql-helper')

const findState = {
  async getByFindState( args ){
    let sql = `SELECT * FROM trade WHERE code = ${args.code}`
    let result = await mysqlHelper.query(sql)
    return result
  }
}

module.exports = findState