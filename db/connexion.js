const Sequelize = require('sequelize');
require('dotenv').config();

const init=() => {
    const {DB_HOST , DB_USER, DB_DB, DB_PASS} = process.env;
    const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASS , {
        host : DB_HOST,
        dialect : 'postgres',
        logging : false
    });
    return sequelize;
}

module.exports = {sequelize : init()}

