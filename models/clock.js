'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clock extends Model {
    static associate(models) {
      Clock.belongsTo(models.List, { foreignKey: 'listId' })
    }
  }
  Clock.init({
    list_id: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Clock',
    tableName: 'Clocks', 
    underscored: true,
  });
  return Clock;
};