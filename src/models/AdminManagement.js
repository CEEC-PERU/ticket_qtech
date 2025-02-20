const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const TypeManagement = require('./TypeManagement');
const User = require('./User');
const Campaign = require('./Campaign');

const AdminManagement = sequelize.define('AdminManagement', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  management_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
          model: TypeManagement,
          key: 'management_id',
        },
  },
  campaign_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
          model: Campaign,
          key: 'campaign_id',
        },
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'admin_managements',
});

module.exports = AdminManagement;

