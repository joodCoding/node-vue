/**
 * @description shopCheck router
 * @author 连泽基
 */
const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')

const { SuccessModel, ErrorModel } = require('../res-module/index')
const { getShopCheck, qualifyShop, manageShop } = require('../controller/check')

// jwt 校验
const { secret } = require('./../utils/singToken')
const jwt = require('koa-jwt')

router.prefix('/api/shop-check')

// 业务员获取未审核列表
router.get('/', jwt({ secret }), async function (ctx, next) {
  const { type } = ctx.state.user
  if (Number(type) !== 2) {
    ctx.body = new ErrorModel(10008, '业务员身份信息校验失败')
    return
  }
  const list = await getShopCheck()
  ctx.body = new SuccessModel(list)
})

// 业务员审核店铺
router.patch('/qualification/:id', jwt({ secret }), async function (ctx, next) {
  const { type } = ctx.state.user
  const id = ctx.params.id // 商店 id
  const { state } = ctx.request.body

  if (Number(type) !== 2) {
    ctx.body = new ErrorModel(10008, '业务员身份信息校验失败')
    return
  }

  try {
    const newShop = await qualifyShop(id, state)
    ctx.body = new SuccessModel(newShop)
  } catch (er) {
    console.error(er)
    ctx.body = new ErrorModel(10011, '业务员审核店铺失败')
  }
})

// 管理员管理店铺资质
router.patch('/:id', jwt({ secret }), async function (ctx, next) {
  const { type } = ctx.state.user
  const id = ctx.params.id // 商店 id
  const data = ctx.request.body

  if (Number(type) !== 3) {
    ctx.body = new ErrorModel(10008, '管理员身份信息校验失败')
    return
  }

  try {
    const newShop = await manageShop(id, data)
    ctx.body = new SuccessModel(newShop)
  } catch (er) {
    console.error(er)
    ctx.body = new ErrorModel(10012, '管理员管理店铺资质失败')
  }
})

module.exports = router
