const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');

const InsurancePolicy = db.define('InsurancePolicy', {
  policy_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  policy_type: {
    type: DataTypes.ENUM('health', 'life', 'property', 'agriculture'),
    allowNull: false,
  },
  coverage_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  premium_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  premium_frequency: {
    type: DataTypes.ENUM('monthly', 'quarterly', 'annually'),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  timestamps: false,
  tableName: 'insurance_policies',
});

module.exports = InsurancePolicy;
