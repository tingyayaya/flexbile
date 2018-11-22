const fs = require('fs');
const XLSX = require('xlsx');

/*
 * @path 写入文件路径
 * @JsonData 写入内容
 */
const workbookempty = {
  SheetNames: ['sheet1'],
  Sheets: {
    'sheet1': {}
  }
}

function xlsxReadWrite(path, JsonData){

  //先判断文件是否存在
  fs.exists(path, function(exists){
    if(exists){
      writeJsonData(path,JsonData)
    }else{
      XLSX.writeFile(workbookempty,path);
      writeJsonData(path,JsonData)
    }
  })
}

function xlsxRead(path){
  
  //先判断文件是否存在
  fs.exists(path, function(exists){
    if(!exists){
      XLSX.writeFile(workbookempty, path);
    }
  })
  
  //读取XLSX文件内容
  var opts = { bookType:'xlsx', bookSST:false, type:'binary' };
  const workbook = XLSX.readFile(path, opts);
  // 获取 Excel 中所有表名
  const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
  // 根据表名获取对应某张表
  const worksheet = workbook.Sheets[sheetNames[0]];
  let Json = XLSX.utils.sheet_to_json(worksheet)
  return Json;
}

//计算表格头字母
function stringFormHeader(code, result=[]){
  var n = parseInt((code-65)/26);
  if(n){
    result.push(n+64);
    return stringFormHeader(code-n*26, result);
  }else{
    result.push(code);
    var len = result.length;
    var string = ''
    for(var i=0; i<len; i++){
      string+= String.fromCharCode(result[i])
    }
    return string;
  }
  
}

//不足两位补0
function formatNum(num){
  return num.toString().replace(/^(\d)$/, "0$1")
}

//转换日期格式
function changeDate(date){
  return date.getFullYear() + '-' + formatNum(date.getMonth() + 1) + '-' + formatNum(date.getDate())
}

function writeJsonData(path, JsonData){
  
  var _headers = ['SKF26[ID]', 'SKF27[openid]', 'SKF28[检测项]', 'SKF29[采样盒号]', 'SKF30[受检者]', 'SKF31[手机号]', 'SKF32[身份证]', 
  'SKF33[采样日期]', 'SKF34[职务]', 'SKF35[所在地区]', 'SKF36[详细地址]','SKF41[订单状态]', 'SKF42[订单编号]', 'SKF43[报告文件]', 'SKF44[报告URL]', 
  'SKF46[报告文件URL]', 'SKF56[注册手机号]', 'SKF82[发出物流单号]', 'SKF83[渠道]', 'SKF84[检测机构]', 'SKF85[发出物流公司]', 'SKF86[性别]', 
  'SKF87[出生年月]', 'SKF123[订单日期]', 'SKF133[回传的样本编码]','SKF135[是否采样]', 'SKF153[收到样本日期]', 'SKF154[检测中日期]',
  'SKF155[检测完成日期]', 'SKF156[受理样本日期]', 'SKF162[是否复购]', 'SKF163[复用采样盒号]','SKF175[已提醒]', 'SKF245[来源]',
  'SKF270[回寄物流编号]', 'SKF282[回寄快递付款方式]', 'SKF284[报告导入次序]', 'SKF298[报告解读状态]']

  var headers = _headers.map(function(v, i){
    return Object.assign({}, {v: v, position: stringFormHeader(65+i) + 1})
  }).reduce(function(prev, next){
    return Object.assign({}, prev, {[next.position]: {v: next.v}})
  }, {});
  
  //统一key
  var arr = [];
  
  JsonData.forEach(function(item){
    var obj = {};
    for(var key in item){
      var s;
      if(key.indexOf('[') !== -1){
        s = key.replace(/\[([\w\W]*)\]/g, '')
        obj[s] = item[key];
      }else{
        obj[key] = item[key];
      }
    }
    arr.push(obj)
  })
 
  var data = arr.map(function(v,i){
    
    return _headers.map(function(k, j){
      
      if( k.indexOf('[') !== -1){
        k = k.replace(/\[([\w\W]*)\]/g, '');
      }
      
      if(v[k] instanceof Date){
        v[k] = changeDate(v[k])
      }
      if(v[k] === null){
        v[k] = ''
      }
      return Object.assign({}, { v: v[k], position: stringFormHeader(65+j) + (i+2) })
    })
  })
  .reduce((prev, next) => prev.concat(next))
  .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
 
  //写入数据

  // 合并 headers 和 data
  var output = Object.assign({}, headers, data);
  // 获取所有单元格的位置
  var outputPos = Object.keys(output);
  // 计算出范围
  var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
 
  // 构建 workbook 对象
  var wb = {
    SheetNames: ['sheet1'],
    Sheets: {
      'sheet1': Object.assign({}, output, { '!ref': ref })
    }
  };
  
  // 导出 Excel
  XLSX.writeFile(wb, path);
}

module.exports = { xlsxReadWrite, xlsxRead};