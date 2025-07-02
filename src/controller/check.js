/**
 * @description shopCheck controller
 * @author 连泽基
 */

const sequelize = require('../sequelize/index')
const { Shop, User } = sequelize.models
const { Op } = require('sequelize')

/**
 * 获取待审核商店列表
 */
async function getShopCheck() {
  const list = await Shop.findAll({
    where: {
      qualificationState: false,
    },
  })
  return list
}

/**
 * 业务员审核商店
 * @param {int} id
 */
async function qualifyShop(id, state) {
  // 切记不要忘了await
  if (state) {
    const res = await Shop.update(
      {
        qualificationState: true,
      },
      {
        where: {
          id: id,
        },
      }
    )
    const shop = await Shop.findByPk(id)
    const changeRes = await User.update(
      { type: 1 },
      {
        where: {
          username: shop.username,
        },
      }
    )
    return shop
  } else {
    const res = await Shop.update(
      {
        qualificationState: false,
      },
      {
        where: {
          id: id,
        },
      }
    )
    return res
  }
}

/**
 * 管理员管理店铺
 * @param {int} id
 * @param {list} data
 */
async function manageShop(id, data) {
  const allowData = {
    qualificationState: data.qualificationState,
    state: data.state,
  }
  const res = await Shop.update(allowData, { where: { id: id } })
  const shop = await Shop.findByPk(id)
  return shop
}

module.exports = {
  getShopCheck,
  qualifyShop,
  manageShop,
}
