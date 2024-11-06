// src/models/groupsModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Group = sequelize.define('Group', {
  group_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  group_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  formation_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: true,
    defaultValue: 'active',
  },
}, {
  tableName: 'groups',
  timestamps: false,
});

module.exports = Group;
