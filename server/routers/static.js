const Router = require('koa-router')
const send = require('koa-send')
// 只是处理 public的路径下的
const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
