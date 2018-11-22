const findStateModel= require('./../model/findState.js')
const retCode = require('./../utils/retcode.js')

const findState = {
  /*
   * 查询合作商订单号
   * @param {object} ctx 
   * @return {object} 结果
   */
  async getByFindState ( ctx ) {
     //koa-bodyparser ctx.request.body 获取post参数
    let form = ctx.request.body;

    const args = {
      code : form.code
    }

    let result = {
      code: retCode.success,
      data: null
    }
   
    if(!args.code){
      result.code = retCode.paramsError
      return result;
    }
    
    let findStateResult = await findStateModel.getByFindState(args)

    result.data = findStateResult
    
    return result
  }

}

module.exports = findState