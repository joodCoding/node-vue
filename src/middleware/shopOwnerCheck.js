/**
 * @description 店主身份验证中间件
 * @author 连泽基
 */

const { ErrorModel } = require('../res-module/index')
const {
  getShopInfo,
} = require('../controller/shop');


// 校验身份
module.exports = async (ctx, next) => {
  const { username, type } = ctx.state.user
  const id = ctx.params.id // 商店 id
  let shop = await getShopInfo(id)
  if (shop.username !== username || Number(type) !== 1) {
    ctx.body = new ErrorModel(10006, '店主身份信息校验失败')
    return
  }
  await next()
}