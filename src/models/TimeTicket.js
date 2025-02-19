const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AdminTicket = require('./AdminTicket');

const Time_ticket = sequelize.define('Time_ticket', {
    time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adminticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AdminTicket,
        key: 'adminticket_id',
      },
    },
    time_pendiente: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    time_proceso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    time_finalizado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    timestamps: true,
    tableName: 'time_tickets',
  });

module.exports = Time_ticket;