const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const Loan = require('./loansModel'); 

const LoanRepayment = db.define('LoanRepayment', {
  repayment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  loan_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Loan,
      key: 'loan_id',
    },
  },
  repayment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount_paid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  balance_remaining: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('on-time', 'late', 'missed'),
    defaultValue: 'on-time',
  },
}, {
  timestamps: false,
  tableName: 'loan_repayments',
});

LoanRepayment.belongsTo(Loan, { foreignKey: 'loan_id' });

module.exports = LoanRepayment;
