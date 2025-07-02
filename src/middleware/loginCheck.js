/**
 * @description 登录验证中间件（废弃）
 * @author 连泽基
 */

const { ErrorModel } = require('../res-module/index')

module.exports = async (ctx, next) => {
    const session = ctx.session

    console.log("登录的session", session)
    console.log("登录的info", ctx.session.userInfo)

    if (session && session.userInfo) {
        await next()
        return
    }


    ctx.body = new ErrorModel(10003, '登录验证失败')
}


// module.exports = async (ctx, next) => {
//     const session = ctx.session
//     if (session && session.userInfo) {
//         await next()
//         return
//     }
//     ctx.body = {
//         errno:-1,
//         message:'登录验证失败'
//     }
// }