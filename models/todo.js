'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Todo.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Todo',
    tableName: 'Todos', 
    underscored: true
  });
  return Todo;
};