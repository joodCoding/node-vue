// 自定义密钥
const secret = "fl.b-18#cd_/12*+jood&koa^!.nam$milo"
const { sign } = require('jsonwebtoken')

/**
 * @param {*} data 加密的数据，最好不要包括密码之类的
 * @param {*} time 有效时长，数字 1000 表示 1000s; 字符串 '10h' 表示 10小时，'1d' 表示1天；具体参考文档
 */
const singToken = (data, time) => {
  const token = sign(
    data,
    secret,
    {
      expiresIn: time
    }
  )
  return token
}

module.exports = {
  singToken,
  secret
}