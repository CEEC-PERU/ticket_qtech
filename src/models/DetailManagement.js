// models/DetailManagement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TypeManagement = require('./TypeManagement');

const DetailManagement = sequelize.define('DetailManagement', {
  det_management_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  management_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeManagement,
      key: 'management_id',
  }
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'detail_managements',
});

module.exports = DetailManagement;