const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const SavingsAccount = require('./savings_accountsModel');

const SavingsTransaction = sequelize.define('SavingsTransaction', {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: DataTypes.INTEGER,
    references: {
      model: SavingsAccount,
      key: 'account_id',
    },
  },
  transaction_type: {
    type: DataTypes.ENUM('deposit', 'withdrawal'),
    allowNull: false,
  },
  transaction_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  balance_after_transaction: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'savings_transactions',
  timestamps: false,
});

SavingsTransaction.belongsTo(SavingsAccount, { foreignKey: 'account_id' });

module.exports = SavingsTransaction;
