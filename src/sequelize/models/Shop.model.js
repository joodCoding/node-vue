/**
 * @description Shop Model
 * @author 连泽基
 */

const { DataTypes } = require('sequelize')

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define(
    'Shop',
    {
      // The following specification of the 'id' attribute could be omitted
      // since it is the default.
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sales: {
        type: DataTypes.INTEGER, // int
        allowNull: true // YES
      },
      slogan: {
        type: DataTypes.STRING, // varchar(50)
        allowNull: true // YES
      },
      expressPrice: {
        field: 'express-price',
        type: DataTypes.DOUBLE, // double
        allowNull: true // YES
      },
      expressLimit: {
        field: 'express-limit',
        type: DataTypes.DOUBLE, // double
        allowNull: false, // NO
        defaultValue: 0 // 默认值
      },
      imgUrl: {
        field: 'img-url',
        type: DataTypes.STRING, // varchar(100)
        allowNull: false // NO
      },
      state: {
        type: DataTypes.BOOLEAN, // tinyint (0/1)
        allowNull: true, // YES
        defaultValue: false // 默认为0
      },
      qualificationState: {
        field: 'qualification-state',
        type: DataTypes.BOOLEAN, // tinyint (0/1)
        allowNull: true, // YES
        defaultValue: false // 默认为0
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'shop',
      createdAt: false,
      updatedAt: false,
    }
  )
}
