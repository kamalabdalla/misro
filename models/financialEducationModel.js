// src/models/financialEducationModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const FinancialEducationProgram = sequelize.define('FinancialEducationProgram', {
  program_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  program_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
    allowNull: true,
    defaultValue: 'upcoming',
  },
}, {
  tableName: 'financial_education_programs',
  timestamps: false,
});

module.exports = FinancialEducationProgram;
