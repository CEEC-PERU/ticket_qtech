const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = require('./Role');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'role_id',
  }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  expired_at: {
    type: DataTypes.DATE,
    allowNull: true
},
failed_login_attempts: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
},
last_failed_login: {
    type: DataTypes.DATE,
    allowNull: true   
},
is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true
},
is_blocked: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
}
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'users',
});

User.comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch
}

module.exports = User;
