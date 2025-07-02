/**
 * @description order controller
 * @author 连泽基
 */

const sequelize = require('../sequelize/index')
const AddressModel = require('../sequelize/models/Address.model')
const { Order, OrderProduct, OrderAddress, Address, Product } = sequelize.models

/**
 * 创建订单
 * @param {string} username 用户名
 * @param {Object} data 订单数据
 */

async function createOrder(username, data) {
  // console.log(username, data)
  // 解构 data（前端传来的订单信息）
  const {
    addressId,
    shopId,
    shopName,
    isCanceled = false, //默认值 false
    products = [], //默认值
  } = data

  // 根据 addressId 获取地址信息
  const addressModel = await Address.findByPk(addressId)
  const addressItem = addressModel.toJSON() // 获取 address {}
  addressItem.id = null // 将id赋为null

  // 复制 address
  const orderAddress = await OrderAddress.create(addressItem)

  // 创建 Order
  const newOrder = await Order.create({
    username, // 默认会变成 username:username
    shopId,
    shopName,
    isCanceled,
    orderAddressId: orderAddress.id, // 外键
  })

  // 获取商品列表
  const pIds = products.map((p) => p.id) // 获取 id 列表
  const productList = await Product.findAll({
    where: {
      shopId: shopId,
      id: pIds,
    },
  })

  // 拼接上购买数量
  const productListWithSales = productList.map((p) => {
    // 商品 id
    p = p.toJSON()
    const id = p.id

    // 通过商品 id 可以找到销售数量
    const filterProducts = products.filter((item) => item.id == id)
    if (filterProducts.length === 0) {
      // 没有找到匹配的数量，报错
      throw new Error('未找到匹配的销量数据')
    }

    p.id = null
    delete p.tabs // 新商品表不含tabs

    return {
      num: filterProducts[0].num, // 销量
      orderId: newOrder.id,
      ...p,
    }
  })

  const orderProduct = await OrderProduct.bulkCreate(productListWithSales)

  delete addressItem.id
  // 结果创建
  const resList = {
    username,
    shopId,
    shopName,
    isCanceled,
    products: productListWithSales,
    address: addressItem,
  }
  return resList
}

/**
 * 获取订单列表（作业）
 * @param {string} username 用户名
 */
async function getOrderList(username) {
  // 联合查询
  const list = await Order.findAll({
    // 一对多联合查询
    where: {
      username,
    },
    order: [
      ['updatedAt', 'DESC'], // 根据 updatedAt 倒序
    ],
    include: [
      {
        model: OrderAddress,
        as: 'address',
      },
      {
        model: OrderProduct,
        as: 'products',
      },
    ],
  })

  const resList = list.map((list) => {
    const products = list.products.map((product) => {
      return {
        product: product,
        num: product.num,
      }
    })

    return {
      id: list.id,
      addressId: list.orderAddressId,
      shopId: list.shopId,
      shopName: list.shopName,
      isCanceled: list.isCanceled, //订单是否被取消
      products: products,
      updatedAt: list.updatedAt,
    }
  })

  return resList
}

/**
 * 获取单个订单信息
 * @param {string} username 用户名
 * @param {string} id 订单 id
 */
async function getOrderDetail(username, id) {
  const order = await Order.findOne({
    where: {
      id,
      username,
    },
    include: [
      {
        model: OrderAddress,
        as: 'address',
      },
      {
        model: OrderProduct,
        as: 'products',
      },
    ],
  })
  if (order == null) {
    return null
  }

  const products = order.products.map((product) => {
    return {
      product: product,
      num: product.num,
    }
  })

  return {
    id: order.id,
    addressId: order.orderAddressId,
    shopId: order.shopId,
    shopName: order.shopName,
    isCanceled: order.isCanceled, //订单是否被取消
    products: products,
    updatedAt: order.updatedAt,
  }
}

module.exports = {
  createOrder,
  getOrderList,
  getOrderDetail,
}
