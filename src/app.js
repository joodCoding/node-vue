const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')

// koa-body 取代
// const bodyparser = require('koa-bodyparser')
const { koaBody } = require('koa-body')

const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const addressRouter = require('./routes/address')
const shopRouter = require('./routes/shop')
const orderRouter = require('./routes/order')
const checkRouter = require('./routes/check')

// error handler
onerror(app)

/* 使用 token 替换
// 配置session
app.keys = ['jood&fjASF*(21'] //秘钥，用于加密
app.use(session({
    //配置cookie
    cookie: {
        path: '/',
        httpOnly: true,//只能通过后端修改cookie，不允许前端js改
        maxAge: 24 * 60 * 60 * 10000,//24h
        sameSite: 'none'
    }
}));
*/

// 1. 定义您的源白名单
const allowedOrigins = [
  'http://localhost:8080',
  'https://www.lian-jood-n8n.top',
]

// 容器网络
app.use(
  cors({
    origin: function (ctx) {
      // 获取请求的 origin 头
      const requestOrigin = ctx.get('Origin')

      // 检查请求的 origin 是否在白名单中
      if (allowedOrigins.includes(requestOrigin)) {
        // 如果在白名单中，则返回该 origin，表示允许
        return requestOrigin
      }

      // 如果来源为空 (例如 Postman 或服务器间请求)，或者不在白名单中，则不允许
      // 返回 false 或不返回任何东西都可以达到禁止的效果
      return false
    },
    credentials: true, //允许跨域携带cookie
  })
)

// middlewares
// koa-body替代
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }))

app.use(koaBody())

app.use(json())
app.use(logger())

// 静态图片配置
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const { ErrorModel } = require('./res-module/index')
// 处理认证异常
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      // 自定义返回结果
      ctx.status = 401
      console.log(err.name)
      ctx.body = new ErrorModel(401, err.message)
    } else {
      throw err
    }
  })
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(addressRouter.routes(), addressRouter.allowedMethods())
app.use(shopRouter.routes(), shopRouter.allowedMethods())
app.use(orderRouter.routes(), orderRouter.allowedMethods())
app.use(checkRouter.routes(), checkRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
