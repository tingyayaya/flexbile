const config = require('../config/mysql-config.js')
const mysql = require("mysql")

const pool = mysql.createPool(config.MYSQL)

let query = function(sql, args) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
          
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, (err, result) => {
                    
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                    //console.log('result:'+JSON.stringify(result))
                    connection.release()

                })
            }
        })
    })
  
}

module.exports = { 
    query 
}