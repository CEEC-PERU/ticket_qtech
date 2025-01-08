const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const TypeManagement = sequelize.define('TypeManagement', {
  management_id: {
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
  tableName: 'type_managements',
});

module.exports = TypeManagement;
