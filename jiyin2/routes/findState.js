const router = require('koa-router')()
const findState = require('../pub/bll/findState')


router.get('/findState', async (ctx, next) => {
  await ctx.render('findState')
})

router.post('/partner/trade/findState', async (ctx, next) => {
 let result = await findState.getByFindState(ctx)
 ctx.body = result
})


module.exports = router