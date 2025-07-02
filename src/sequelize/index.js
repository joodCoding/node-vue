/**
 * @description sequelize 连接数据库
 * @author 连泽基
 */

const { Sequelize } = require('sequelize')
const { applyExtraSetup } = require('./extra-setup')
const { initData } = require('./init-data') // 引入初始化数据函数
require('dotenv').config() // 加载 .env 文件中的环境变量

const hostName = process.env.DB_HOST
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbPort = process.env.DB_PORT

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: hostName,
  port: dbPort,
  dialect: 'postgres',
  logging: false, // 禁用日志，可选
})

const modelDefiners = [
  require('./models/Address.model'),
  require('./models/User.model'),
  require('./models/Product.model'),
  require('./models/Shop.model'),
  require('./models/ShopTab.model'),

  //订单
  require('./models/Order.model'),
  require('./models/OrderAddress.model'),
  require('./models/OrderProduct.model'),

  // Add more models here...
  // require('./models/item'),
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize)

// 自动同步数据库
sequelize
  .sync({ alter: false })
  .then(() => {
    // 使用 alter: true 尝试修改现有表结构而不删除数据
    console.log('Sequelize: 数据库同步成功。')
    // initData(sequelize) // 同步成功后初始化数据
  })
  .catch((err) => {
    console.error('Sequelize: 数据库同步失败:', err)
  })

/*
// test connection
sequelize.authenticate().then(() => {
  console.log("连接成功")
}).catch((error) => {
  console.log("错误")
})
*/

/*
// test model
const { Address, User, Product, Shop, Order, OrderProduct, OrderAddress } = sequelize.models;

async function queryProducts () {
  // const result = await Address.findAll({
  //   // 一对多联合查询
  //   include: {
  //     model: User,
  //   }
  // })
  // const result = await Product.findAll({
  //   // 一对多联合查询
  //   include: {
  //     model: Shop,
  //   }
  // })
  const result = await Order.findAll({
    // 一对多联合查询
    include: [
      {
        model: OrderAddress
      },
      {
        model: OrderProduct
      }
    ]
  })
  console.log(result[0].dataValues.OrderProducts)
}
queryProducts()
*/

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
