const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FileDetail = sequelize.define('File_Detail', {
    id_file: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_det_request: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'file_details',
  });

  module.exports = FileDetail;