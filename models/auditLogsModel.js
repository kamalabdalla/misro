// src/models/auditLogsModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./UserModel');

const AuditLog = sequelize.define('AuditLog', {
  audit_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'audit_logs',
  timestamps: false,
});

AuditLog.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AuditLog;
