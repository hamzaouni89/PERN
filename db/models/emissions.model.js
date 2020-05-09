const { Model } = require('sequelize');
const { commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes){
    const { STRING, DATE, INTEGER } = DataTypes;
    class Emissions extends Model { }
    Emissions.init({
        id_emission: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom_emission: {
            type: STRING({ length: 256 }),
            unique: false
        },
        dure: {
            type: INTEGER,
            unique: false
        },
        date_emission: {
            type: DATE,
            unique: false
        },
        animateur: {
            type: STRING({ length: 256 }),
            unique: false
        },
        visiteur: {
            type: STRING({ length: 256 }),
            unique: false
        },
    }, { ...commonOptions, modelName: 'emissions' ,sequelize});

    Emissions.beforeSync(() => console.log('Before creating The Emissions Table'));
    Emissions.afterSync(() => console.log('After creating The Emissions Table'));

    return Emissions;

}






