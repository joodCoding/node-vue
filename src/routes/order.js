/**
 * @description order router
 * @author 连泽基
 */

const router = require('koa-router')()

// jwt 校验
const { secret } = require('./../utils/singToken')
const jwt = require('koa-jwt')

const { SuccessModel, ErrorModel } = require('../res-module/index')

// session认证模块
// const loginCheck = require('../middleware/loginCheck')

// 注意这里需要写成{ createOrder }，不能单写createOrder
const {
  createOrder,
  getOrderList,
  getOrderDetail,
} = require('../controller/order')

router.prefix('/api/order')

// 创建订单
router.post('/', jwt({ secret }), async function (ctx, next) {
  // 当前用户名
  const userInfo = ctx.state.user
  const username = userInfo.username

  // 获取订单数据
  const data = ctx.request.body

  //创建订单
  try {
    const newOrder = await createOrder(username, data)
    ctx.body = new SuccessModel(newOrder)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(10005, '订单创建失败')
  }
})

// 获取订单列表
router.get('/', jwt({ secret }), async function (ctx, next) {
  // 有登录验证，可以直接获取 session
  const userInfo = ctx.state.user
  const username = userInfo.username

  const list = await getOrderList(username)

  ctx.body = new SuccessModel(list)
})

// 获取单个订单信息
router.get('/:id', jwt({ secret }), async function (ctx, next) {
  const userInfo = ctx.state.user
  const username = userInfo.username
  const { id } = ctx.params // 获取 url 参数

  const order = await getOrderDetail(username, id)
  ctx.body = new SuccessModel(order)
})

module.exports = router
