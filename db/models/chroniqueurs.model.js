const { Model } = require('sequelize');
const { commonOptions } = require('./common.model');

module.exports = function (sequelize, DataTypes) {
    const { STRING, DATE, BIGINT, INTEGER } = DataTypes;
    class Chroniqueurs extends Model {}

    Chroniqueurs.init({
        id_chroniqueur: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: STRING({ length: 256 }),
            unique: false
        },
        prenom: {
            type: STRING({ length: 256 }),
            unique: false
        },
        date_naissance: {
            type: DATE,
            unique: false
        },
        num_tel: {
            type: BIGINT,
            unique: false
        },
    }, {...commonOptions, modelName: 'chroniqueurs',sequelize });

    Chroniqueurs.beforeSync(() => console.log('Before creating The Chroniqueurs Table'));
    Chroniqueurs.afterSync(() => console.log('After creating The Chroniqueurs Table'));

    return Chroniqueurs ;
}




