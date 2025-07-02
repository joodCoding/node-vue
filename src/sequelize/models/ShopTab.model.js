/**
 * @description Shop Model
 * @author 连泽基
 */

const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define('ShopTab', {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    tab: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shopId: {
      field: 'shop-id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'shop_tab',
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['shop-id', 'tab']
      }
    ]
  });
};