/**
 * @description 订单数据操作
 * @author 连泽基
 */

const sequelize = require('../../index')
const { Op } = require('sequelize')
const { Order, OrderProduct, OrderAddress, Address, Product } = sequelize.models


!(async () => {

    //创建订单
    const requestBody = {
        addressId: '3',
        shopId: '3',
        shopName: '沃尔玛',
        isCanceled: false, //订单是否被取消
        products: [
            {
                id: '4',
                num: 3 //购买数量
            },
            {
                id: '5',
                num: 5 //购买数量
            }
        ]
    }
    // 获取 address
    const address = await Address.findByPk(requestBody.addressId)
    // console.log(address.toJSON()) address模式格式复杂，需要使用toJson转换为常规对象
    const addressItem = address.toJSON();
    addressItem.id = null
    const orderAddress = await OrderAddress.create(addressItem)

    // 获取商品列表
    // map 将数组元素依次传入，接受一个返回值代替原值
    const pIds = requestBody.products.map(p => Number(p.id)) //{'商品1 id'},{'商品2 id'}
    const productList = await Product.findAll({
        where: {
            id: pIds, // id 只获取和 pIds数组元素 相同的字段
            shopId: requestBody.shopId
        }
    })

    // 创建订单
    // console.log(orderAddress.id)
    const order = await Order.create({
        username: 'jood', // 存储在session中
        shopId: requestBody.shopId, //已添加
        shopName: requestBody.shopName, //已添加
        isCanceled: requestBody.isCanceled, //已添加
        orderAddressId: orderAddress.id
    })

    // console.log(pIds)
    // console.log(productList)
    //整合订单商品数据
    const productListWidthSales = productList.map(p => {
        // 商品 id
        const id = Number(p.id)

        // 找到商品的购买数量
        // filter 过滤，返回值为true留下，=== 类型也要相同
        const filterProducts = requestBody.products.filter(item => Number(item.id) === id)
        if (filterProducts.length === 0) {
            // 没有找到匹配的数量，报错
            throw new Error('未找到匹配的销量数据')
        }

        return {
            num: filterProducts[0].num, // 销量
            shopId: p.shopId,
            orderId: order.id,
            name: p.name,
            imgUrl: p.imgUrl,
            sales: p.sales,
            price: p.price,
            oldPrice: p.oldPrice
        }
    })
    // console.log(productListWidthSales)

    // 创建订单商品表
    const orderProduct = await OrderProduct.bulkCreate(productListWidthSales)



})()