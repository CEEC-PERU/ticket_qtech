const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Level = sequelize.define('Level', {
  level_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'levels',
});

module.exports = Level;