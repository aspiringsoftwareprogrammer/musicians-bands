const {sequelize} = require('../db');
const { Sequelize, Model, DataTypes } = require('sequelize');

// TODO - define the Band model
class Musician extends Model {};

Musician.init({
    name: DataTypes.STRING,
    instrument: DataTypes.STRING,
},{
    sequelize: sequelize,
    modelName: "Musician"
})


module.exports = {
    Musician
};
