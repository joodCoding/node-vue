/**
 * @description Product Model
 * @author 连泽基
 */

const { DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define(
    'OrderProduct',
    {
      // The following specification of the 'id' attribute could be omitted
      // since it is the default.
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      shopId: {
        field: 'shop-id',
        type: DataTypes.INTEGER,
      },
      orderId: {
        field: 'order-id',
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sales: {
        type: DataTypes.FLOAT,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      oldPrice: {
        field: 'old-price',
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      imgUrl: {
        field: 'img-url',
        type: DataTypes.STRING,
        allowNull: false,
      },
      num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'order_commodity',
      createdAt: false,
      updatedAt: false,
    }
  )
}
