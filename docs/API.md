# API（接口）设计

## 注册

### url

`/api/user/register`

### method

`post`

### request body

```js
{
  username: '18633334444',
  password : '123abc'
}
```

### response body

```js
{
  errno: 0,
  message: 'errnp !== 0 的话,的错误信息'
}
```

## 登录

### url

`/api/user/login`

### method

`post`

### request body

```js
{
  username: '18633334444',
  password : '123abc'
}
```

### response body

```js
{
  errno: 0,
  data:{
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvb2QiLCJ0eXBlIjoxLCJpYXQiOjE2NzMyNzY0MTcsImV4cCI6MTY3MzMxMjQxN30.LS5TbI4McI2vgxjgzq4WIwxOJYBzwzsWwdWRXybxT_E'
  }
  message: 'errnp !== 0 的话,的错误信息'
}
```

## 获取用户信息

## API 有修改 ！！！！！！！！

## 完成进度：接口测试完成

### url

`/api/user/info`

### method

`get`

### request body

无

### response body

```js
{
    ereno:0,
    data:{
        username:'xxxx'，
        // 新增字段 type
        type:2
        /*
            普通用户 0
            店主 1
            业务员 2
            管理员 3
        */
    }
    message: 'errnp !== 0 的话,的错误信息'
}
```

## 创建收货地址

### url

`/api/user/address`

### method

`post`

### request body

```js
{
    city:'北京',
    department:'xx小区',
    houseNumber:'门牌号',
    name:'张三',
    phone:'18677778888'
}
```

### response body

```js
{
    errno:0,
    data:{
        id:'收货地址的 id',
        city:'北京',
        department:'xx小区',
        houseNumber:'门牌号',
        name:'张三',
        phone:'18677778888',
        createAt:'Date',
        updateAt:'Date'
    },
    message:'errno !== 0 错误信息'
}
```

## 获取收货地址列表

`/api/user/address`

### url

`get`

### method

### request body

无

### response body

```js
{
    errno:0,
    data:[
        {
            id:'收货地址的 id',
            city:'北京',
            department:'xx小区',
            houseNumber:'门牌号',
            name:'张三',
            phone:'18677778888'
        }
    ]
    message:'errno !== 0 错误信息'
}
```

## 获取单个收货地址

### url

`/api/user/address/:id` `(:id是一个动态参数，服务端可获取具体的参数值)`

示例：

`/api/user/address/100`

`/api/user/address/101`

### method

`get`

### request body

无

### response body

```js
{
    errno:0,
    data:{
            id:'收货地址的 id',
            city:'北京',
            department:'xx小区',
            houseNumber:'门牌号',
            name:'张三',
            phone:'18677778888'
    },
    message:'errno !== 0 错误信息'

}
```

## 更新收货地址

### url

`/api/user/address/:id`

### method

`patch`

### request body

```js
{
    city:'北京',
    department:'xx小区',
    houseNumber:'门牌号',
    name:'张三',
    phone:'18677778888'
}
```

### response body

```js
{
    errno:0,
    message:'errno !== 0 错误信息'
}
```

## 附近（热门）商店

## 仅返回 qualificationState 和 state 都为 true 的商店

## 新增 query 查询，默认是取所有商店

## 完成进度：接口测试完成

### url

`/api/shop/hot-list`

### query

`name=商店名`

## 未设置则是所有

举例：

`/api/shop/hot-list?name=山姆商店`

`/api/shop/hot-list?name=jood商店`

### method

`get`

### request body

无

### response body

```js
{
    errno:0,
    data:[
        {
           id:'店铺 id',
           name:'沃尔玛',
           imgUrl:'商店的图片 url',
           sales:10000,//月售
           expressLimit:0,//起送价格
           expressPrice:5,//快递价格
           slogan:'VIP 尊享满 89 元减 4 元运费券'
        }
    ]
    message:'errno !== 0 时错误信息'
}
```

## 商店详情

## API 有修改 ！！！！！！！！

## 完成进度：接口测试完成

### url

`/api/shop/:id`

### method

`get`

### request body

无

### response body

```js
{
    errno:0,
    data:{
        id:'店铺 id',
        name:'沃尔玛',
        imgUrl:'商店的图片 url',
        sales:10000,//月售
        expressLimit:0,//起送价格
        expressPrice:5,//快递价格
        slogan:'VIP 尊享满 89 元减 4 元运费券'
        // 新增了tabs数据 ！！！！！！！！
        tabs:{
            {
                name: '全部商品',
                tab: 'all'
            },
        }
    },
    message:'errno !== 0 时错误信息'
}
```

## 商铺信息管理

## API 新增 ！！！！！！！！

## 完成进度：接口测试完成

## 新增图片

## 功能新增 ！！！！！！！！

## 完成进度：接口测试完成

## 功能：上传图片，则删除原图片，并且同上面一样上传图片，修改 imgUrl，无图片则不修改

## 同时可只修改其他属性

### url

`/api/shop/:id`

### method

`PATCH`

### request body

```js
{
    name:'沃尔玛',
    img:File, // 该字段通过前端表单File，其文件名确定，注意设计这个的name为img
    sales:10000, // 月售
    expressLimit:0, // 起送价
    expressPrice:5, // 运费
    slogan:'红色的宣传标语'，
    // 店铺是否开张
    state:0
}
```

### response body

```js
{
    errno:0,
    message:'errno !== 0 错误信息'
}
```

## 入驻申请

## API 新增 ！！！！！！！！

## 完成进度：接口测试完成

## 上传图片功能

## 功能新增 ！！！！！！！！

## 完成进度：已完成

### url

`api/shop`

### method

`POST`

### request body

```js
{
    name: "沃尔玛",
    sales: 10000,
    slogan: "VIP尊享满89元减4元运费券",
    expressPrice: 5,
    expressLimit: 0,
    img:File
}
```

### response body

```js
{
    errno:0,
    data:{
        id:'新建商铺id',
        name:'沃尔玛',
        imgUrl:'xxx.png', // 本地图片位置
        sales:10000, // 月售
        expressLimit:0, // 起送价
        expressPrice:5, // 运费
        slogan:'红色的宣传标语'
    },
    message:'errno !== 0 错误信息'
}
```

## （业务员）获取未审核商铺列表

## API 新增 ！！！！！！！！

## 完成进度：接口测试完成

### url

`api/shop-check`

### method

`GET`

### request body

无

### response body

```js
{
    errno:0,
    data:[
        {
           id:'店铺 id',
           name:'沃尔玛',
           imgUrl:'商店的图片 url',
           sales:10000,//月售
           expressLimit:0,//起送价格
           expressPrice:5,//快递价格
           slogan:'VIP 尊享满 89 元减 4 元运费券'
           state: 1,
           qualificationState: 0,
           username: "jood"
        }
    ]
    message:'errno !== 0 时错误信息'
}
```

## （业务员审核）店铺通过审核

## API 新增 ！！！！！！！！

## 完成进度：接口测试完成

## 业务：将 id 的对应 shop，qualificationState 设为 true

### url

`api/shop-check/qualification/:id` `(审核商铺id)`

### method

`PATCH`

### request body

无

### response body

```js
{
    errno:0,
    message:'errno !== 0 错误信息'
}
```

## （管理员）获取所有商铺列表

## API 新增 ！！！！！！！！

## 完成进度：接口以测试完成

### url

`api/shop`

### method

`GET`

### request body

无

### response body

```js
{
    errno:0,
    data:[
        {
           id:'店铺 id',
           name:'沃尔玛',
           imgUrl:'商店的图片 url',
           sales:10000,//月售
           expressLimit:0,//起送价格
           expressPrice:5,//快递价格
           slogan:'VIP 尊享满 89 元减 4 元运费券',
           qualificationState:0 // 资格状态
           state:0 // 店铺状态
        }
    ]
    message:'errno !== 0 时错误信息'
}
```

## （管理员管理）资质管理

## API 新增 ！！！！！！！！

## 完成进度：接口测试完成

### url

`api/shop-check/:id` `(审核商铺id)`

### method

`PETCH`

### request body

```js
{
    id:'店铺 id',
    name:'沃尔玛',
    imgUrl:'商店的图片 url',
    sales:10000,//月售
    expressLimit:0,//起送价格
    expressPrice:5,//快递价格
    slogan:'VIP 尊享满 89 元减 4 元运费券',
    qualificationState:0 // 资格状态
    state:0 // 店铺状态
}
```

### response body

```js
{
    errno:0,
    data:{
        id:'店铺 id',
        name:'沃尔玛',
        imgUrl:'商店的图片 url',
        sales:10000,//月售
        expressLimit:0,//起送价格
        expressPrice:5,//快递价格
        slogan:'VIP 尊享满 89 元减 4 元运费券',
        qualificationState:0 // 资格状态
        state:0 // 店铺状态
    }
    message:'errno !== 0 错误信息'
}
```

## 查询（某个）商店的商品列表

## API 更改！！

### url

`/api/shop/:id/products`

### query

`tab=all`

`name=商店名`

## 默认未设置就是所有

举例：

`/api/shop/10/products?tab=all`

## 未设置 name 默认匹配所有 name

`/api/shop/10/products?name=jood商店`

## 默认 tab=all

### method

`get`

### request body

无

### response body

```js
{
    errno:0,
    data:[
        {
            id:'商品 id',
            name:'番茄 250g/份',
            imgUrl:'xxx.png',
            sales:10,//月售
            price:33.6,
            oldprice:40.6
        }
    ]
    message:'errno !== 0 时错误信息'
}
```

## 商铺 tab 管理（修改和新增）

## API 新增

## 完成进度：接口测试完成

### url

`/api/shop/:id/tabs`

### method

`PATCH`

### request body

```js
{
  tabs: [
    {
      name: '全部商品',
      tab: 'all',
    },
  ]
}
```

### response body

```js
{
    {
        errno:0,
        data:{
            tabs:[
                {
                    name: '全部商品',
                    tab: 'all',
                }
            ]
        }
        message:'errno !== 0 错误信息'
    }
}
```

## 商铺产品管理（新增和修改） （原 API）

## API 修改 ！！！！！！！！

## 由于 API 要新增图片的修改，把一堆文件一起传入的操作显得不切实际，故使用 form 的方式，一个一个处理

## 基于这种方式，由于 API 的规范，则将 API 分为新建和修改两种

## 商铺产品新增

## API 新增 ！！！！！！！！

## 完成进度：接口测试完成

### url

`/api/shop/:id/product`

### method

`POST`

### request body

```js
{
    "name": "葡萄",
    "sales": 100, // 可选（默认为0）
    "price": 33,
    "oldPrice": 36, // 可选（默认为price）
    "tabs":"all,seckill,fruit" // 最好使用多选提供选项，最后传递为此格式
    "img": File
}
```

### response body

```js
{
    errno:0,
    data:{
        "id": 1
        "name": "葡萄",
        "imgUrl": "/images/product/grape.jpg", // File 传递的图片
        "sales": 100,
        "price": 33,
        "oldPrice": 36,
        "tabs":"all,seckill,fruit" // 最好使用多选提供选项，最后传递为此格式
    }
    message:'errno !== 0 错误信息'
}
```

## 商铺产品修改

## API 新增 ！！！！！！！！

## 完成进度：接口测试完成

### url

`/api/shop/:id/product/:productId`

### method

`PATCH`

### request body

```js
{
    "name": "葡萄",
    "sales": 100, // 可选（默认为0）
    "price": 33,
    "oldPrice": 36, // 可选（默认为price）
    "tabs":"all,seckill,fruit" // 最好使用多选提供选项，最后传递为此格式
    "img": File
}
```

### response body

```js
{
    errno:0,
    data:{
        "id": 1
        "name": "葡萄",
        "imgUrl": "/images/product/grape.jpg", // File 传递的图片
        "sales": 100,
        "price": 33,
        "oldPrice": 36,
        "tabs":"all,seckill,fruit" // 最好使用多选提供选项，最后传递为此格式
    }
    message:'errno !== 0 错误信息'
}
```

## 创建订单

### url

`/api/order`

### method

`post`

### request body

```js
{
    addressId:'收货地址 id',
    shopId:'商店的 id',
    shopName:'沃尔玛',
    isCanceled:false,//订单是否被取消
    products:[
        {
            id:'商品1 id',//复制？引用？
            num:3 //购买数量
        },
        {
            id:'商品2 id',
            num:5 //购买数量
        }
    ]
}
```

### response body

```js
{
    errno:0,
    data:{
        id:'订单 id',
    },
    message:'errno !== 0 时错误信息'
}
```

## 获取订单列表

### url

`api/order`

### method

`get`

### request body

无

### response body

```js
[{
    addressId:'收货地址 id',
    shopId:'商店的 id',
    shopName:'沃尔玛',
    isCanceled:false,//订单是否被取消
    products:[
        {
            product:{}
            num:3 //购买数量
        },
        {
            product:{}
            num:5 //购买数量
        }
    ]
}]
```

## 获取单个订单详细信息

### url

`api/order/:id`

### method

`get`

### request body

无

### response body

```js
{
    addressId:'收货地址 id',
    shopId:'商店的 id',
    shopName:'沃尔玛',
    isCanceled:false,//订单是否被取消
    products:[
        {
            product:{}
            num:3 //购买数量
        },
        {
            product:{}
            num:5 //购买数量
        }
    ]
}
```

<!--

## 标题

### url

### method

### request body

```js
{
}
```

### response body

```js
{
}
```

-->
