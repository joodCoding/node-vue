# 数据模型设计

## 用户user

```js
{
    id:'xxx',
    username:'18677778888',
    password:'123'
    type:11
}
```

## 地址address

```js
{
    id:'xxx',
    username:'18677778888', // 外键字段 address:n <-> user:1
    city:'北京',
    department:'xxx小区',
    houseNumber:'门牌号',
    name:'张三',
    phone:'18655566666'
}
```

## 商店shop

```js
{
    id:'xxxxx',
    name:'沃尔玛',
    imgUrl:'xxx.png', // 本地图片位置
    sales:10000, // 月售
    expressLimt:0, // 起送价
    expressPrice:5, // 运费
    slogan:'红色的宣传标语'
}
```

## 目录tab
```js
{ 
    name: '全部商品', 
    tab: 'all' 
}
```

## 商品commodity

```js
{
    id:'xxx',
    shopId:'xxxxx' // 外键字段 commodity:n <-> shop:1
    name:'番茄',
    imgUrl:'xxx.png',
    sales:10,
    price:33.6,
    oldPrice:40.6, // 原价
    tabs:['all','seckill'] // 商品对应 左侧 tab 类型
}
```

## 订单order

```js
{
    id:'xxx',

    username:'zhangsan',
   
    shopId:'商店的id',
    shopName:'沃尔玛',

    isCanceled:false,//订单是否被取消

    address:{
        "username": "zhangsan",
        "city": "北京",
        "department": "yyy小区A",
        "houseNumber": "门牌号2A",
        "name": "张三A",
        "phone": "18632451111",
    },

    products:[
        {
            product:{
                {
                    "shopId": "6162b97e226bf13191c1207f",
                    "name": "葡萄",
                    "imgUrl": "/images/product/grape.jpg",
                    "sales": 100,
                    "price": 33,
                    "oldPrice": 36,
                },
                num:3
            }
        }
    ]
}
```

## 商铺管理model
```js
{
    tabs:[
        {
            name: '全部商品', 
            tab: 'all' 
        }
    ],
    products:[
        {
            {
                "shopId": 1,
                "name": "葡萄",
                "imgUrl": "/images/product/grape.jpg",
                "sales": 100,
                "price": 33,
                "oldPrice": 36,
            },
        }
    ]
}
```