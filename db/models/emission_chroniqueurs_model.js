const { Model } = require('sequelize');
const { commonOptions } = require('./common.model');

module.exports = function (sequelize, DataTypes) {

    const { INTEGER } = DataTypes;
    class EmissionChroniqueurs extends Model {}

    EmissionChroniqueurs.init({
        id_emission_chroniqueurs: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
     },
      {
        ...commonOptions ,
        modelName : 'emissionChroniqueurs',
        sequelize
    });

    EmissionChroniqueurs.beforeSync(() => console.log('Before creating The EmissionChroniqueurs Table'));
    EmissionChroniqueurs.afterSync(() => console.log('After creating The EmissionChroniqueurs Table'));

    return EmissionChroniqueurs ;

};