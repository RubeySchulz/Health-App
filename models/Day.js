// const Day (belongs to User)(has one Nutrients) (has day/id, calories consumed, calories burned)

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Day extends Model{}

Day.init(
    {
        date: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        calories_consumed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        calories_burned: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'day'
    }
);

module.exports = Day;