'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.belongsTo(models.User, { foreignKey: 'userId' })
      List.hasMany(models.Clock,  { foreignKey: 'listId' })
    }
  }
  List.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    date: DataTypes.DATEONLY,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
  }, {
    sequelize,
    modelName: 'List',
    tableName: 'Lists', 
    underscored: true
  });
  return List;
};