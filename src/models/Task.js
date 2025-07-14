const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task= sequelize.define('Task', {
    id_task: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'tasks',
  });

  module.exports = Task;