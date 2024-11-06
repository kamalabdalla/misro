// src/models/groupMemberModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./UserModel');
const Group = require('./groupsModel');

const GroupMember = sequelize.define('GroupMember', {
  group_member_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'group_id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  join_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: true,
    defaultValue: 'active',
  },
}, {
  tableName: 'group_members',
  timestamps: false,
});

GroupMember.belongsTo(Group, { foreignKey: 'group_id' });
GroupMember.belongsTo(User, { foreignKey: 'user_id' });

module.exports = GroupMember;
