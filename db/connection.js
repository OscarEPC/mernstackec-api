const { Sequelize } = require('sequelize');


const db = new Sequelize('mearnstackec', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

module.exports = {
    db
};