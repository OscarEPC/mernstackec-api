const { DataTypes } = require('sequelize');

const { db } = require('../db/connection');

const User = db.define('User', {
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = {
    User
}