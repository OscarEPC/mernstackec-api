const { DataTypes } = require('sequelize');

const { db } = require('../db/connection');

const Person = db.define('Persona', {
    name: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    dni: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = {
    Person
}