const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Request = require('./Request');
const User = require('./User');

const AdminTicket = sequelize.define('AdminTicket', {
  adminticket_id: {
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
    }
    },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Request,
        key: 'request_id',
    }
    },
  }, {
    tableName: 'admin_tickets',
    timestamps: true,
  });

  module.exports = AdminTicket;