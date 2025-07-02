/**
 * @description shop controller
 * @author 连泽基
 */

const sequelize = require('../sequelize/index')
const { Shop, ShopTab, Product } = sequelize.models
const { Op } = require('sequelize')
const File = require('fs')

/**
 * 获取所有商店列表
 */
async function getAllShop() {
  const list = await Shop.findAll()
  return list
}

/**
 * 获取商店列表（热门商店）
 */
async function getHotList(name) {
  let list
  if (!name) {
    list = await Shop.findAll({
      where: {
        state: true,
        qualificationState: true,
      },
      order: [['sales', 'DESC']],
    })
  } else {
    list = await Shop.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        state: true,
        qualificationState: true,
      },
      order: [['sales', 'DESC']],
    })
  }

  return list
}

/**
 * 获取商店信息
 * @param {string} id id
 */
async function getShopInfo(id) {
  const shop = await Shop.findByPk(id, {
    include: {
      model: ShopTab,
      as: 'tabs',
    },
  })
  return shop
}

/**
 * 根据商店获取商品
 * @param {string} shopId 商店id
 * @param {string} tab tab分类
 */
async function getProductsByShopId(id, tab = 'all', name) {
  let list
  if (!name) {
    list = await Product.findAll({
      where: {
        [Op.and]: [
          { shopId: id },
          // tabs数组中是否含有tab
          // 兼容 PostgreSQL 的 find_in_set 替代方案
          {
            [Op.or]: [
              { tabs: tab }, // 精确匹配，例如 tabs = 'all'
              { tabs: { [Op.like]: `${tab},%` } }, // 以 tab 开头，例如 tabs = 'all,tab1'
              { tabs: { [Op.like]: `%,${tab}` } }, // 以 tab 结尾，例如 tabs = 'tab1,all'
              { tabs: { [Op.like]: `%,${tab},%` } } // 中间包含 tab，例如 tabs = 'tab1,all,tab2'
            ]
          },
        ],
      },
    })
  } else {
    list = await Product.findAll({
      where: {
        [Op.and]: [
          {
            shopId: id,
            name: { [Op.like]: `%${name}%` },
          },
          // tabs数组中是否含有tab
          // 兼容 PostgreSQL 的 find_in_set 替代方案
          {
            [Op.or]: [
              { tabs: tab }, // 精确匹配，例如 tabs = 'all'
              { tabs: { [Op.like]: `${tab},%` } }, // 以 tab 开头，例如 tabs = 'all,tab1'
              { tabs: { [Op.like]: `%,${tab}` } }, // 以 tab 结尾，例如 tabs = 'tab1,all'
              { tabs: { [Op.like]: `%,${tab},%` } } // 中间包含 tab，例如 tabs = 'tab1,all,tab2'
            ]
          },
        ],
      },
    })
  }

  return list
}

/**
 * 入驻申请
 * @param {string} id
 * @param {list} data
 */
async function createShop(username, data) {
  const allowData = {
    name: data.name,
    imgUrl: data.imgUrl, // 本地图片位置
    sales: data.sales, // 月售
    expressLimit: data.expressLimit, // 起送价
    expressPrice: data.expressPrice, // 运费
    slogan: data.slogan,
    username: username,
  }

  const shop = await Shop.create(allowData)
  return shop
}

/**
 * 店主管理店铺信息
 * @param {int} id
 * @param {list} data
 */
async function updateShop(id, data) {
  const allowData = {
    name: data.name,
    imgUrl: data.imgUrl, // 本地图片位置
    sales: data.sales, // 月售
    expressLimit: data.expressLimit, // 起送价
    expressPrice: data.expressPrice, // 运费
    slogan: data.slogan,
    // 店铺是否开张
    state: data.state,
  }

  const res = await Shop.update(allowData, {
    where: {
      id: id,
    },
  })

  const shop = await getShopInfo(id)
  return shop
}

/**
 * 新建和更新tabs
 * @param {int} id
 * @param {list} data
 */
async function createAndUpdateTabs(id, data) {
  const allTab = await ShopTab.findAll({
    where: {
      shopId: id,
    },
  })

  // 删除没有的字段
  // Promise.all能够将Promise数组转为其return值
  const tabKeys = await Promise.all(
    allTab.map(async (item) => {
      // 字段是否存在于数据库
      let bool = false
      data.forEach((dataItem) => {
        if (dataItem.tab === item.tab) bool = true
        // 只允许包括在传入data中的tab保留
      })

      if (!bool) {
        // 删除没有的字段
        await ShopTab.destroy({
          where: {
            shopId: id,
            tab: item.tab,
          },
        })
      }

      return item.tab
    })
  )

  // map异步调用
  const resTab = await Promise.all(
    data.map(async (item) => {
      // data的数据都要加入或修改
      if (!tabKeys.includes(item.tab)) {
        // 不在tabKeys中，说明是新建的字段
        const allowData = {
          shopId: id,
          tab: item.tab,
          name: item.name,
        }
        const tab = await ShopTab.create(allowData)
        return tab
      } else {
        // 已存在的tab修改
        const tab = await ShopTab.findOne({
          where: {
            shopId: id,
            tab: item.tab,
          },
        })
        if (tab.name !== item.name) {
          tab.name = item.name
          await tab.save()
        }
        return tab
      }
    })
  )

  return resTab
}

/**
 * 新建product
 * @param {int} id
 * @param {list} data
 */
async function createProduct(id, data) {
  const allowData = {
    name: data.name,
    shopId: id,
    imgUrl: data.imgUrl,
    sales: data.sales || 0,
    // || 才是或，| 好像是位或
    price: data.price,
    oldPrice: data.oldPrice || data.price,
    tabs: data.tabs,
  }
  const product = await Product.create(allowData)
  return product

  /*
    旧product

    const allProducts = await getProductsByShopId(id)

    // 删除没有的字段
    // Promise.all能够将Promise数组转为其return值
    const productKeys = await Promise.all(allProducts.map(async (item) => {
        // 字段是否存在于数据库
        let bool = false
        data.forEach(dataItem => {
            if (dataItem.id === item.id) bool = true
            // 两种情况：一种是新增的数据，一种是存在于数据库中但是没有的字段
        })

        if (!bool) {
            // 删除没有的字段
            await Product.destroy({
                where: {
                    id: item.id
                }
            })
        }

        return item.id
    }))

    // map异步调用
    const resProduct = await Promise.all(data.map(async (item) => {
        const allowData = {
            name: item.name,
            shopId: id,
            imgUrl: item.imgUrl,
            sales: item.sales,
            price: item.price,
            oldPrice: item.oldPrice,
            tabs: item.tabs
        }
        // data的数据都要加入或修改
        if (!productKeys.includes(item.id)) {
            // 不在productKeysKeys中，前面已经把没有的删除，所以这里都是新建
            // 新增的字段
            const product = await Product.create(allowData)
            return product
        }
        else {
            // 已存在的tab修改
            const res = await Product.update(allowData,
                {
                    where: {
                        id: item.id
                    }
                })
            const product = await Product.findOne({
                where: {
                    id: item.id
                }
            })
            return product
        }
    }));

    return resProduct

    */
}

/**
 * 修改product
 * @param {int} id
 * @param {int} productId
 * @param {list} data
 * @param {list} files
 */
async function updateProduct(id, productId, data, files) {
  const allowData = {
    name: data.name,
    sales: data.sales,
    price: data.price,
    oldPrice: data.oldPrice || data.price,
    tabs: data.tabs,
  }

  // 空对象默认为true，得用这个来判断
  if (Object.keys(files).length !== 0) {
    // 删除原来图片
    const product = await Product.findByPk(productId)
    const url = product.imgUrl.substr(22) // images/product/wmt.jpeg

    File.unlink(`${__dirname}/../public/${url}`, () => {})

    const { img } = files
    allowData.imgUrl = `http://localhost:3000/images/product/${img.newFilename}`
  }

  const res = await Product.update(allowData, {
    where: {
      id: productId,
      shopId: id,
    },
  })
  const product = await Product.findByPk(productId)
  return product
}

/**
 * 删除product
 * @param {int} id 商店id
 * @param {int} productId 商品id
 */
async function deleteProduct(id, productId) {
  const product = await Product.findByPk(productId)
  if (product) {
    const url = product.imgUrl.substr(22) // images/product/wmt.jpeg
    File.unlink(`${__dirname}/../public/${url}`, () => {})
    const res = await Product.destroy({
      where: {
        id: productId,
        shopId: id,
      },
    })
    return res > 0 // 返回是否删除成功
  }
  return false
}

/**
 * 根据用户名获取店铺信息
 * @param {string} username 用户名
 */
async function getShopByUsername(username) {
  const shop = await Shop.findOne({
    where: { username }
  })
  return shop
}

module.exports = {
  getAllShop,
  getHotList,
  getShopInfo,
  getProductsByShopId,
  updateShop,
  createShop,
  createAndUpdateTabs,
  createProduct,
  updateProduct,
  getShopByUsername,
  deleteProduct
}
