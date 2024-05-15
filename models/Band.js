const {sequelize} = require('../db');
const { Sequelize, Model, DataTypes } = require('sequelize');

// TODO - define the Band model
class Band extends Model {};

Band.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
},{
    sequelize: sequelize,
    modelName: "Band"
})


module.exports = {
    Band
};