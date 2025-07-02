/**
 * @description sequelize extra setup
 * @author 连泽基
 */

function applyExtraSetup (sequelize) {
	const { Address, User, Product, Shop, ShopTab, Order, OrderProduct, OrderAddress } = sequelize.models;

	// foreignKey 用于指定联合的字段，默认的名称很奇怪，比如UserUsername
	Address.belongsTo(User, {
		foreignKey: 'username'
	})
	User.hasMany(Address, {
		foreignKey: 'username'
	})

	Product.belongsTo(Shop, {
		foreignKey: 'shopId'
	})
	Shop.hasMany(Product, {
		foreignKey: 'shopId'
	})

	// 商店 与 商店标签
	Shop.hasMany(ShopTab, {
		foreignKey: 'shopId',
		as: 'tabs'
	})
	ShopTab.belongsTo(Shop, {
		foreignKey: 'shopId'
	})

	// 订单 一对一
	OrderAddress.hasOne(Order, {
		foreignKey: 'orderAddressId',
	})
	Order.belongsTo(OrderAddress, {
		foreignKey: 'orderAddressId',
		as: 'address'
	})

	/*
		注意这两种方式后面的foreignKey代表的意思不同，Order.hasmany，外键肯定是在OrderProduct中，
		所以这个foreignKey指的是OrderProduct的外键，注意这个方向，使得Order可以连结到OrderProdut
		第二种方式是属于，父子的关系，外键肯定是在前者的地方。
		所以其实两个都是一样的，就是那个连接两个表的外键
	*/
	// 一对多
	Order.hasMany(OrderProduct, {
		foreignKey: 'orderId',
		as: 'products'
	})
	OrderProduct.belongsTo(Order, {
		foreignKey: 'orderId',
	})


}

module.exports = { applyExtraSetup };
