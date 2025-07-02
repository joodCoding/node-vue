/**
 * @description Order Model
 * @author 连泽基
 */

const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('Order', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shopId: {
            field: 'shop-id',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shopName: {
            field: 'shop-name',
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCanceled: {
            field: 'is-canceled',
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        orderAddressId: {
            field: 'order-address-id',
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'order',
        createdAt: true,
        updatedAt: true,
    });
};