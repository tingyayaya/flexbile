const getDate = function(){
  const date = new Date();
  return date.getFullYear()+formatNum(date.getMonth() + 1) + formatNum(date.getDate())
}

const formatNum = function(num){
  return num.toString().replace(/^(\d)$/, '0$1')
}
module.exports = getDate