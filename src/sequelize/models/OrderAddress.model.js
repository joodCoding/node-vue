/**
 * @description Address Model
 * @author 连泽基
 */

const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('OrderAddress', {
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
        },
        city: {
            type: DataTypes.STRING
        },
        department: {
            type: DataTypes.STRING
        },
        houseNumber: {
            field: 'house-number',
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'order_address',
        createdAt: false,
        updatedAt: false,
    });
};