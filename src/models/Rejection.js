const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Request = require('./Request');
const User = require('./User');
const notificationRejectionService = require('../services/ticket/notificationRejection');
const Rejection = sequelize.define('Rejection', {
  rejection_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Request,
      key: 'request_id',
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
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'rejections',
  hooks: {
    async afterCreate(request, options) {
      await notificationRejectionService.notifySolicitante(request); // Llamar al servicio de notificación
    },
  },

});

module.exports = Rejection;
