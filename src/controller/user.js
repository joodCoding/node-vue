/**
 * @description user controller
 * @author 连泽基
 */

const { where } = require('sequelize');
const sequelize = require('../sequelize/index');
const { User } = sequelize.models;

/**
 * 注册
 * @param {String} username 
 * @param {String} password 
 */
async function register (username, password) {
    // 保存到数据库
    const newUser = await User.create({ username, password })
    return newUser
}

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */

async function login (username, password) {
    const user = await User.findOne(
        {
            where: {
                username: username,
                password: password
            }
        }
    )
    if (user != null) {
        // 登录成功
        return { res: true, type: user.type }
    }
    // 登录失败
    return { res: false }
}

module.exports = {
    register,
    login
}