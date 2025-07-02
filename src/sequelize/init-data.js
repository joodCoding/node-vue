/**
 * @description 初始化数据库数据
 * @author 连泽基
 */

async function initData(sequelize) {
  // 强制同步数据库，删除所有表并重新创建
  // 先删除所有表再重新创建
  await sequelize.drop()
  await sequelize.sync()

  const {
    User,
    Shop,
    Product,
    Address,
    ShopTab,
    Order,
    OrderAddress,
    OrderProduct,
  } = sequelize.models

  console.log('开始初始化数据库数据...')

  // 创建用户
  const [user1] = await User.findOrCreate({
    where: { username: 'jood1' },
    defaults: { password: 'jood1', type: 1 },
  })
  const [user2] = await User.findOrCreate({
    where: { username: 'jood2' },
    defaults: { password: 'jood2', type: 2 },
  })
  const [user3] = await User.findOrCreate({
    where: { username: 'jood3' },
    defaults: { password: 'jood3', type: 3 },
  })

  await User.findOrCreate({
    where: { username: 'jood0' },
    defaults: { password: 'jood0', type: 0 },
  })

  // 创建地址
  const [address1] = await Address.findOrCreate({
    where: { username: 'jood1', houseNumber: '门牌号1' },
    defaults: {
      city: '北京',
      department: 'xxx小区',
      name: '张三',
      phone: '18677778888',
    },
  })
  const [address2] = await Address.findOrCreate({
    where: { username: 'jood1', houseNumber: '门牌号2' },
    defaults: {
      city: '北京',
      department: 'yyy小区',
      name: '张三',
      phone: '18632452342',
    },
  })
  const [address3] = await Address.findOrCreate({
    where: { username: 'jood1', houseNumber: '门牌号3' },
    defaults: {
      city: '北京',
      department: 'ddd小区',
      name: '张三1',
      phone: '18632452344',
    },
  })

  // 创建商店
  const [shop1] = await Shop.findOrCreate({
    where: { name: '沃尔玛' },
    defaults: {
      username: user1.username,
      imgUrl: 'http://www.lian-jood-n8n.top/images/shop/wmt.jpeg',
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      slogan: 'VIP尊享满89元减4元运费券',
      qualificationState: true,
      state: true,
    },
  })
  const [shop2] = await Shop.findOrCreate({
    where: { name: '山姆会员商店' },
    defaults: {
      username: user1.username,
      imgUrl: 'http://www.lian-jood-n8n.top/images/shop/sam.jpeg',
      sales: 2000,
      expressLimit: 0,
      expressPrice: 5,
      slogan: '联合利华洗护满10减5',
      qualificationState: true,
      state: true,
    },
  })
  // 创建商店 Tab
  await ShopTab.findOrCreate({
    where: { shopId: shop1.id, tab: 'all' },
    defaults: { name: '全部商品' },
  })
  await ShopTab.findOrCreate({
    where: { shopId: shop1.id, tab: 'seckill' },
    defaults: { name: '秒杀' },
  })
  await ShopTab.findOrCreate({
    where: { shopId: shop1.id, tab: 'fruit' },
    defaults: { name: '新鲜水果' },
  })
  await ShopTab.findOrCreate({
    where: { shopId: shop2.id, tab: 'all' },
    defaults: { name: '全部商品' },
  })
  await ShopTab.findOrCreate({
    where: { shopId: shop2.id, tab: 'seckill' },
    defaults: { name: '秒杀' },
  })
  await ShopTab.findOrCreate({
    where: { shopId: shop2.id, tab: 'fruit' },
    defaults: { name: '新鲜水果' },
  })

  // 创建商品
  await Product.findOrCreate({
    where: { name: '葡萄', shopId: shop1.id },
    defaults: {
      imgUrl: 'http://www.lian-jood-n8n.top/images/product/grape.jpg',
      sales: 100,
      price: 33,
      oldPrice: 36,
      tabs: 'all,fruit',
    },
  })
  await Product.findOrCreate({
    where: { name: '苹果', shopId: shop1.id },
    defaults: {
      imgUrl: 'http://www.lian-jood-n8n.top/images/product/apple.jpeg',
      sales: 200,
      price: 25,
      oldPrice: 27,
      tabs: 'all,seckill,fruit',
    },
  })
  await Product.findOrCreate({
    where: { name: '桃子', shopId: shop2.id },
    defaults: {
      imgUrl: 'http://www.lian-jood-n8n.top/images/product/peach.jpg',
      sales: 50,
      price: 16,
      oldPrice: 19,
      tabs: 'all,fruit',
    },
  })
  await Product.findOrCreate({
    where: { name: '西瓜', shopId: shop2.id },
    defaults: {
      imgUrl: 'http://www.lian-jood-n8n.top/images/product/watermelon.jpg',
      sales: 180,
      price: 13,
      oldPrice: 15,
      tabs: 'all,seckill,fruit',
    },
  })

  // 创建订单 (简化处理，只创建部分数据，复杂逻辑在测试文件中)
  // 注意：5-order.js 中的逻辑依赖于已存在的 addressId 和 shopId，这里简化处理
  const [orderAddress1] = await OrderAddress.findOrCreate({
    where: { username: address1.username, houseNumber: address1.houseNumber },
    defaults: {
      city: address1.city,
      department: address1.department,
      name: address1.name,
      phone: address1.phone,
    },
  })

  const [order1] = await Order.findOrCreate({
    where: { username: user1.username, shopId: shop1.id },
    defaults: {
      shopName: shop1.name,
      isCanceled: false,
      orderAddressId: orderAddress1.id,
    },
  })

  // 假设商品已存在，这里只创建订单商品关联
  const productGrape = await Product.findOne({
    where: { name: '葡萄', shopId: shop1.id },
  })
  const productApple = await Product.findOne({
    where: { name: '苹果', shopId: shop1.id },
  })

  if (productGrape) {
    await OrderProduct.findOrCreate({
      where: { orderId: order1.id, name: productGrape.name }, // 使用 name 替代 productId
      defaults: {
        num: 3,
        shopId: productGrape.shopId,
        name: productGrape.name,
        imgUrl: productGrape.imgUrl,
        sales: productGrape.sales,
        price: productGrape.price,
        oldPrice: productGrape.oldPrice,
      },
    })
  }

  if (productApple) {
    await OrderProduct.findOrCreate({
      where: { orderId: order1.id, name: productApple.name }, // 使用 name 替代 productId
      defaults: {
        num: 5,
        shopId: productApple.shopId,
        name: productApple.name,
        imgUrl: productApple.imgUrl,
        sales: productApple.sales,
        price: productApple.price,
        oldPrice: productApple.oldPrice,
      },
    })
  }

  console.log('数据库数据初始化完成。')
}

module.exports = { initData }
