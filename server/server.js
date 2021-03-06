const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const koaBody = require('koa-body')
const koaSession = require('koa-session') // 用户登陆用的

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
// 处理db的 请求的url
const createDb = require('./db/db')
const config = require('../app.config')
const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()

app.keys = ['vue ssr']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000 // 过期时间
}, app))

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

// 写了个中间件专门处理db（请求的url）
app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})
// 处理favicon.ico
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(koaBody()) // 处理ctx.body中的数据
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
  // pageRouter = require('./routers/dev-ssr-no-bundle')
} else {
  pageRouter = require('./routers/ssr')
  // pageRouter = require('./routers/ssr-no-bundle')
}
// koa的api
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
