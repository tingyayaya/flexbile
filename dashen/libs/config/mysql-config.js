/**
 * 配置文件
 */

//production
const production = {

  //服务器端口
  SERVER_PORT : 3000,


  //MYSQL数据库配置
  MYSQL: {
      host: "localhost",
      user: "root",   //用户名密码
      password: "12345678",    //密码
      port: "3306",        //端口
      database: "chenkuserdb35",   //数据库名
      supportBigNumbers: true,
      multipleStatements: true,
      timezone: 'utc',
  }
}

//开发配置
const development = {

  //服务器端口
  SERVER_PORT : 6100,


  //MYSQL数据库配置
  MYSQL: {
      host: "chenksh.f3322.net",
      user: "xiaoya",   //用户名密码
      password: "123456",    //密码
      port: "6000",        //端口
      database: "chenkuserdb35",   //数据库名
      supportBigNumbers: true,
      multipleStatements: true,
      timezone: 'utc',
  }
}

const config = development

module.exports = config