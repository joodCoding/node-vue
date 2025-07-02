/**
 * @description User Model
 * @author 连泽基
 */

const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER,
        
        }
    }, {
        tableName: 'user',
        createdAt: false,
        updatedAt: false,
    });
}