/**
 * @description 地址数据操作
 * @author 连泽基
 */

const sequelize = require('../../index')
const { Address } = sequelize.models

!(async () => {
    // // 创建收货地址
    // await Address.create({
    //     username: 'zhangsan',
    //     city: '北京',
    //     department: 'xxx小区',
    //     houseNumber: '门牌号1',
    //     name: '张三',
    //     phone: '18677778888'
    // })

    // // 再创建一个地址
    // await Address.create({
    //     username: 'zhangsan',
    //     city: '北京',
    //     department: 'yyy小区',
    //     houseNumber: '门牌号2',
    //     name: '张三',
    //     phone: '18632452342'
    // })
    // // 再创建一个地址
    // await Address.create({
    //     username: 'zhangsan01',
    //     city: '北京',
    //     department: 'ddd小区',
    //     houseNumber: '门牌号3',
    //     name: '张三1',
    //     phone: '18632452344'
    // })

    // // 获取收货地址列表（获取 zhangsan 的）
    // const addressList = await Address.findAll({
    //     where: {
    //         username: 'zhangsan'
    //     },
    //     order: [
    //         ['phone', 'DESC']
    //     ]
    // })
    // console.log(addressList)

    // 根据id获取单个收货地址
    // const id = 1
    // const address = await Address.findByPk(id)
    // console.log(address)

    // // 更新收货地址
    // const newData = {
    //     city: '广州',
    //     department: 'yyy小区B',
    //     houseNumber: '门牌号2B',
    //     name: 'zhangsanB',
    //     phone: '18632451112'
    // }
    // const address = await Address.update(newData, {
    //     where: {
    //         id: 3,
    //         username: 'zhangsan',
    //     }
    // })
    // console.log(address)
})()