const RetCode = {
  success: 0,	//成功
  failed: 1, //失败
  accountError: 2,  //账号错误
  accountError: 3,  //密码错误
  tokenInvalid: 5,  //token无效
  paramsError: 6,   //参数错误
  systemException: 7,  //系统异常
	databaseOperationException: 8	 //数据库操作异常
}

module.exports = RetCode