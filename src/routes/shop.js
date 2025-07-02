/**
 * @description shop router
 * @author 连泽基
 */
const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const typeCheck = require('../middleware/shopOwnerCheck')

const { SuccessModel, ErrorModel } = require('../res-module/index')
const { koaBody } = require('koa-body')
const File = require('fs')
const {
  getAllShop,
  getHotList,
  getShopInfo,
  getProductsByShopId,
  createShop,
  updateShop,
  createAndUpdateTabs,
  createProduct,
  updateProduct,
  getShopByUsername,
  deleteProduct,
} = require('../controller/shop')
const shopOwnerCheck = require('../middleware/shopOwnerCheck')

// jwt 校验
const { secret } = require('./../utils/singToken')
const jwt = require('koa-jwt')

router.prefix('/api/shop')

// 所有商店
router.get('/', async function (ctx, next) {
  const list = await getAllShop()
  ctx.body = new SuccessModel(list)
})

// 热门商店（首页商店列表）
router.get('/hot-list', async function (ctx, next) {
  const name = ctx.query.name // query 里的 name参数，默认为 'all'
  const list = await getHotList(name)
  ctx.body = new SuccessModel(list)
})

// 根据 id 查询单个商店信息
router.get('/:id', async function (ctx, next) {
  const id = ctx.params.id // 商店 id
  const shop = await getShopInfo(id)
  ctx.body = new SuccessModel(shop)
})

// 入驻申请
// 文件上传已完成
router.post(
  '/',
  koaBody({
    multipart: true, // 支持文件上传
    allowEmptyFiles: false,
    formidable: {
      uploadDir: `${__dirname}/../public/images/shop/`, // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 4 * 1024 * 1024, // 文件上传大小
    },
  }),
  jwt({ secret }),
  async function (ctx, next) {
    const { username } = ctx.state.user
    const data = ctx.request.body || {} // 前端传来的数据
    const files = ctx.request?.files // 文件名获取

    // 空对象默认为true，得用这个来判断
    if (Object.keys(files).length !== 0) {
      const { img } = files
      data.imgUrl = `http://www.lian-jood-n8n.top/images/shop/${img.newFilename}`
      try {
        const shop = await createShop(username, data)
        ctx.body = new SuccessModel(shop)
      } catch (er) {
        console.error(er)
        ctx.body = new ErrorModel(10007, '入驻申请失败')
      }
    } else {
      ctx.body = new ErrorModel(10007, '入驻申请失败')
    }
  }
)

// 店主管理商铺
// 已完成删除原文件和更改文件
router.patch(
  '/:id',
  jwt({ secret }),
  async function (ctx, next) {
    // 校验身份
    const { username, type } = ctx.state.user
    const id = ctx.params.id // 商店 id
    let shop = await getShopInfo(id)
    if (shop.username !== username || Number(type) !== 1) {
      ctx.body = new ErrorModel(10006, '店主身份信息校验失败')
      return
    }

    const listJSON = JSON.stringify(shop.toJSON())

    // 传递shop供后面使用
    // koa默认不支持中文造成，所以要编码一下才可以，不然会报错非法
    ctx.set('shopList', encodeURIComponent(listJSON))

    await next()
  },
  koaBody({
    multipart: true, // 支持文件上传
    allowEmptyFiles: true,
    formidable: {
      uploadDir: `${__dirname}/../public/images/shop/`, // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 4 * 1024 * 1024, // 文件上传大小
    },
  }),
  async function (ctx, next) {
    const data = ctx.request.body || {} // 前端传来的数据
    console.log(data)

    const id = ctx.params.id // 商店 id
    console.log(id)
    console.log(ctx.request)

    const files = ctx.request?.files

    // 空对象默认为true，得用这个来判断
    if (Object.keys(files).length !== 0) {
      const shopJSON = decodeURIComponent(ctx.response.get('shopList')) // 获取前面传递的数据
      const shop = JSON.parse(shopJSON)
      const url = shop.imgUrl.substr(22) // images/shop/wmt.jpeg

      try {
        // 删除原来图片
        File.unlink(`${__dirname}/../public/${url}`)
      } catch (er) {
        console.error(er)
        ctx.body = new ErrorModel(10010, '更新店铺信息失败')
        return
      }

      const { img } = files
      data.imgUrl = `http://www.lian-jood-n8n.top/images/shop/${img.newFilename}` // 新增的imgUrl
    }

    console.log('test')
    console.log(data)
    try {
      const newShop = await updateShop(id, data)
      ctx.body = new SuccessModel(newShop)
    } catch (er) {
      console.error(er)
      ctx.body = new ErrorModel(10010, '更新店铺信息失败')
    }
  }
)

// 获取商店的商品
router.get('/:id/products', async function (ctx, next) {
  const shopId = ctx.params.id // 商店 id
  const tab = ctx.query.tab || 'all' // query 里的 tab 参数，默认为 'all'
  const name = ctx.query.name
  // 获取商品
  const products = await getProductsByShopId(shopId, tab, name)
  ctx.body = new SuccessModel(products)
})

// 根据用户名查询店铺
router.get('/info/:username', async function (ctx, next) {
  const { username } = ctx.params
  const shop = await getShopByUsername(username)
  if (shop) {
    ctx.body = new SuccessModel(shop)
  } else {
    ctx.body = new ErrorModel(10016, '店铺不存在')
  }
})

module.exports = router

// 商铺tab管理（修改和新增）
router.patch(
  '/:id/tabs',
  jwt({ secret }),
  shopOwnerCheck,
  async function (ctx, next) {
    const { tabs } = ctx.request.body || {} // 前端传来的数据
    const id = ctx.params.id // 商店 id

    // tab新增或更改
    try {
      const tabRes = await createAndUpdateTabs(id, tabs)
      ctx.body = new SuccessModel({ tabs: tabRes })
    } catch (er) {
      console.error(er)
      ctx.body = new ErrorModel(10013, 'Tab修改失败')
    }
  }
)

// 新增product
router.post(
  '/:id/product',
  jwt({ secret }),
  shopOwnerCheck,
  koaBody({
    multipart: true, // 支持文件上传
    allowEmptyFiles: false,
    formidable: {
      uploadDir: `${__dirname}/../public/images/product/`, // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 4 * 1024 * 1024, // 文件上传大小
    },
  }),
  async function (ctx, next) {
    const product = ctx.request.body || {} // 前端传来的数据
    console.log(product)
    const id = ctx.params.id // 商店 id
    console.log(id)
    const files = ctx.request?.files // 文件名获取
    console.log(files)

    // product的新增
    // 空对象默认为true，得用这个来判断
    if (Object.keys(files).length !== 0) {
      const { img } = files
      product.imgUrl = `http://www.lian-jood-n8n.top/images/product/${img.newFilename}`
      try {
        const res = await createProduct(id, product)
        ctx.body = new SuccessModel(res)
      } catch (er) {
        console.error(er)
        ctx.body = new ErrorModel(10014, 'Product创建失败')
      }
    } else {
      ctx.body = new ErrorModel(10014, 'Product创建失败')
    }
  }
)

// 更改product
router.post(
  '/:id/product/:productId',
  jwt({ secret }),
  shopOwnerCheck,
  koaBody({
    multipart: true, // 支持文件上传
    allowEmptyFiles: true,
    formidable: {
      uploadDir: `${__dirname}/../public/images/product/`, // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 4 * 1024 * 1024, // 文件上传大小
    },
  }),
  async function (ctx, next) {
    const product = ctx.request.body || {} // 前端传来的数据
    const id = ctx.params.id // 商店 id
    const productId = ctx.params.productId // 商品 id
    const files = ctx.request?.files // 文件对象

    try {
      const res = await updateProduct(id, productId, product, files)
      ctx.body = new SuccessModel(res)
    } catch (er) {
      console.error(er)
      ctx.body = new ErrorModel(10015, 'Product更新失败')
    }
  }
)

// 删除product
router.delete(
  '/:id/product/:productId',
  jwt({ secret }),
  shopOwnerCheck,
  async function (ctx, next) {
    const id = ctx.params.id // 商店 id
    const productId = ctx.params.productId // 商品 id

    try {
      const res = await deleteProduct(id, productId)
      ctx.body = new SuccessModel(res)
    } catch (er) {
      console.error(er)
      ctx.body = new ErrorModel(10017, 'Product删除失败')
    }
  }
)
