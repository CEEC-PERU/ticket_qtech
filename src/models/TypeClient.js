const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const TypeClient = sequelize.define('TypeClient', {
  client_id: {
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
  tableName: 'type_clients',
});

module.exports = TypeClient;