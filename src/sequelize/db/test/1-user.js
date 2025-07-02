/**
 * @description 用户数据操作
 * @author 连泽基
 */
const sequelize = require('../../index')
const { User } = sequelize.models

!(async () => {
    //注册:创建一个新的用户
    // await User.create({
    //     username: 'zhangsan',
    //     password: '123'
    // })

    // //再建一个新的用户
    // await User.create({
    //     username: '186999888',
    //     password: '123'
    // })

    // 登录：查询单个用户
    const zhangsan = await User.findOne({
        where: {
            username: '186999888',
            password: '1234'
        }
    })
    console.log('zhangsan', zhangsan)
})()