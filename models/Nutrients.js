// const Nutrients (belongs to Day) (has carbs(g), proteins(g), fats(g), sodium(mg), cholestoral(mg))

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Nutrients extends Model{}

Nutrients.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        proteins: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        fats: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        sodium: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        cholesterol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        date_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'day',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'nutrients'
    }
);

module.exports = Nutrients;