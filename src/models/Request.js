const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Campaign = require('./Campaign');
const DetailManagement = require('./DetailManagement');
const State = require('./State');
const TypeClient = require('./TypeClient');
const TypeManagement = require('./TypeManagement');

const Request = sequelize.define('Request', {
  request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  campaign_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Campaign,
      key: 'campaign_id',
  }
  },
  det_management_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DetailManagement,
      key: 'det_management_id',
  }
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeClient,
      key: 'client_id',
  }
  },
  management_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeManagement,
      key: 'management_id',
  }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
  }
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: State,
      key: 'state_id',
  }
  },
  number_ticket: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'requests',
});

module.exports = Request;