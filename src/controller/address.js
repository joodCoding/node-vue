/**
 * @description address controller
 * @author 连泽基
 */

const sequelize = require('../sequelize/index')
const { Address } = sequelize.models

/**
 * 创建地址
 * @param {string} username 用户名
 * @param {Object} data 地址的详细信息
 */
async function createAddress (username, data) {
    const address = await Address.create({
        username: username, // 把 username 拼接上，因为前端传入的数据没有 username
        ...data // 解构展开，会自动变成上面的形式
    })
    return address
}

/**
 * 获取地址列表
 * @param {string} username 用户名
 */
async function getAddressList (username) {
    const list = await Address.findAll({
        where: {
            username: username
        }
    })
    return list
}

/**
 * 查找单个收货地址
 * @param {string} id id
 */
async function getAddressById (id) {
    const address = await Address.findByPk(id)
    return address
}
/**
 * 更新地址信息
 * @param {string} id id
 * @param {string} username 用户名
 * @param {Object} data 地址的详细信息
 */
async function updateAddress (id, username, data) {
    const allowData = {
        city: data.city,
        department: data.department,
        houseNumber: data.houseNumber,
        name: data.name,
        phone: data.phone
    }
    const res = await Address.update(allowData, {
        where: {
            id: id,
            username: username,
        }
    })

    // 模型的格式比较复杂，不过经过JSON转换后会正常化，Koa会自动做转换
    const addressModel = await Address.findOne({
        where: {
            id: id,
            username: username,
        }
    }
    )

    return addressModel
}


module.exports = {
    createAddress,
    getAddressList,
    getAddressById,
    updateAddress
}
