const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');



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
  }, {
    tableName: 'details_request',
    timestamps: true,
  });

  
  module.exports = DetailRequest;