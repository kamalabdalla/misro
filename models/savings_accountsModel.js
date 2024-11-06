// src/models/savings_accountsModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./UserModel');

const SavingsAccount = sequelize.define('SavingsAccount', {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Reference to the User model
      key: 'user_id'
    }
  },
  account_balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  interest_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'savings_accounts',
  timestamps: false
});

SavingsAccount.belongsTo(User, { foreignKey: 'user_id' }); // Define association

module.exports = SavingsAccount;
