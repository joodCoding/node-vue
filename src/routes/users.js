const router = require('koa-router')()
const { register, login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../res-module/index')
const loginCheck = require('../middleware/loginCheck')

// jwt 校验
const { singToken, secret } = require('./../utils/singToken')
const jwt = require('koa-jwt')

// 前缀
router.prefix('/api/user')

router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body

  try {
    const newUser = await register(username, password)
    // 返回成功
    /*
        {
            errno: 0,
            data: newUser // 多好过少
        }
        */
    ctx.body = new SuccessModel(newUser)
  } catch (ex) {
    console.error(ex)
    // 返回失败
    /*
        {
            errno: 10001,
            message: `注册失败 - ${ex.message}`
        }
        */
    ctx.body = new ErrorModel(10001, `注册失败 - ${ex.message}`)
  }
})

//登录
router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body

  // 查询单个用户（登录验证）
  const { res, type } = await login(username, password)

  if (res) {
    /*
        // 旧session模式
        // 验证成功，设置 session.userInfo
        ctx.session.userInfo = { username, type }
        */

    tokenDate = {
      username,
      type,
    }
    // 返回token
    token = singToken(tokenDate, '10h')
    const data = {
      data: { username, type },
      token,
    }

    // 登录成功
    ctx.body = new SuccessModel(data)
  } else {
    // 登录失败
    ctx.body = new ErrorModel(10002, `登录验证失败`)
  }
})

// 获取用户信息
router.get('/info', jwt({ secret }), async function (ctx, next) {
  // 加了 loginChenck 之后，因为保证了必须登录
  const userInfo = ctx.state.user
  ctx.body = new SuccessModel(userInfo)
})

module.exports = router
