const login = require('./login')

const createTrade = require('./createTrade')

var pass = {
  openKey: '93319a4441fae08309390fd2e8326002',
  openSecret: 'b842f1db09ef1bfda2ae1c1f70ec57c7',
}

var pass2 = { 
  trading : {
    "totalPrice":699.0,
    "totalAmount":699.0,
    "fundAmount":699.0,
    "code":"301807282121",
    "receiver":"叶伟标",
    "receiverCountry":"1",
    "receiverProvince":"440000",
    "receiverCity":"440300",
    "receiverRegion":"440306",
    "receiverAddress":"远方科技中心15楼壹基因",
    "sampleCode":"201807292053",
    "itemId":"PT473085982111956992",
    "buyerPhone":"18857121799"
  }
}

//测试
createTrade(pass2, '',function(data){
  console.log(data)
})

