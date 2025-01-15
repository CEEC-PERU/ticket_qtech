const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Request = require('./Request');
const DetailRequest = sequelize.define('Detail_Request', {
    id_det_request: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    detail_name: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: 'details_request',
    timestamps: true,
  });
  
  module.exports = DetailRequest;