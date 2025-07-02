/**
 * @description 商品数据操作
 * @author 连泽基
 */

const sequelize = require('../../index')
const { Op } = require('sequelize')
const { Product } = sequelize.models

!(async () => {
    // // 创建
    // await Product.create({
    //     shopId: '3', // 沃尔玛
    //     name: '葡萄',
    //     imgUrl: '/images/product/grape.jpg',
    //     sales: 100, // 月售多少
    //     price: 33, // 当前价格
    //     oldPrice: 36, // 原价
    //     tabs: 'all,seckill,fruit'
    // })
    // await Product.create({
    //     shopId: '3', // 沃尔玛
    //     name: '苹果',
    //     imgUrl: '/images/product/apple.jpeg',
    //     sales: 200, // 月售多少
    //     price: 25, // 当前价格
    //     oldPrice: 27, // 原价
    //     tabs: 'all,seckill,fruit'
    // })
    // await Product.create({
    //     shopId: '4', // 山姆会员店
    //     name: '桃子',
    //     imgUrl: '/images/product/peach.jpg',
    //     sales: 50, // 月售多少
    //     price: 16, // 当前价格
    //     oldPrice: 19, // 原价
    //     tabs: 'all,seckill,fruit'
    // })
    // await Product.create({
    //     shopId: '4', // 山姆会员店
    //     name: '西瓜',
    //     imgUrl: '/images/product/watermelon.jpg',
    //     sales: 180, // 月售多少
    //     price: 13, // 当前价格
    //     oldPrice: 15, // 原价
    //     tabs: 'all,seckill,fruit'
    // })

    // // 查询某个商店，某个tab的商品列表
    // const list = await Product.findAll({
    //     where: {
    //         [Op.and]: [
    //             { shopId: 3 },
    //             sequelize.where(sequelize.fn('find_in_set', 'seckill', sequelize.col('tabs')), {
    //                 [Op.gt]: 0
    //             }) // tabs数组中是否含有seckill，大于0则存在
    //         ]
    //         ,

    //     }
    // })
    // console.log(list)

})()