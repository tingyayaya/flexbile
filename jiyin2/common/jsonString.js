
stringConcat = {
  createTradeJson(obj){
    var s = {};
    s['totalPrice'] = obj['totalPrice']
    s['totalAmount'] = obj['totalAmount']
    s['fundAmount'] = obj['fundAmount']
    s['code'] = obj['code']
    s['receiver'] = obj['receiver']
    s['receiverCountry'] = obj['receiverCountry']
    s['receiverProvince'] = obj['receiverProvince']
    s['receiverCity'] = obj['receiverCity']
    s['receiverRegion'] = obj['receiverRegion']
    s['receiverAddress'] = obj['receiverAddress']
    s['SampleCode'] = obj['sampleCode']
    s['itemId'] = obj['itemId']
    s['buyerPhone'] = obj['buyerPhone']
    return s;
  },
  stringConcat(opt){
    var result = '';
  
    for(key in opt){
      if(typeof opt[key] == 'number'){
        result += `\"${key}\":${opt[key].toFixed(1)},`;
      }else{
        result += `\"${key}\":\"${opt[key]}\",`;
      }
    }
    result = result.substring(0,result.length-1);
    result = `{${result}}`;
  
    return result;
  }
}


module.exports = stringConcat