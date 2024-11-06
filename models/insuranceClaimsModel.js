// models/insuranceClaimsModel.js
const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const InsurancePolicy = require('./insurancePoliciesModel'); 

const InsuranceClaim = db.define('InsuranceClaim', {
  claim_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  policy_id: {
    type: DataTypes.INTEGER,
    references: {
      model: InsurancePolicy,
      key: 'policy_id',
    },
  },
  claim_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  claim_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  claim_status: {
    type: DataTypes.ENUM('submitted', 'approved', 'denied', 'paid'),
    defaultValue: 'submitted',
  },
}, {
  timestamps: false,
  tableName: 'insurance_claims',
});

InsuranceClaim.belongsTo(InsurancePolicy, { foreignKey: 'policy_id' });

module.exports = InsuranceClaim;
