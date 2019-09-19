const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'cjw' && user.password === '123') {
    ctx.session.user = { username: 'cjw' }
    ctx.body = {
      success: true,
      data: {
        username: 'cjw'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
