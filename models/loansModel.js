const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig');
const User = require('./UserModel'); 
const Group = require('./groupsModel'); 

const Loan = db.define('Loan', {
  loan_id: {
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
  group_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'group_id',
    },
  },
  loan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  interest_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  loan_term: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  repayment_schedule: {
    type: DataTypes.ENUM('weekly', 'monthly'),
    allowNull: false,
  },
  loan_status: {
    type: DataTypes.ENUM('pending', 'approved', 'disbursed', 'repaid', 'defaulted'),
    defaultValue: 'pending',
  },
  application_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  approval_date: {
    type: DataTypes.DATE,
  },
  disbursement_date: {
    type: DataTypes.DATE,
  },
  due_date: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  tableName: 'loans',
});

Loan.belongsTo(User, { foreignKey: 'user_id' });
Loan.belongsTo(Group, { foreignKey: 'group_id' });

module.exports = Loan;
