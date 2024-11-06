const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./UserModel');
const FinancialEducationProgram = require('./financialEducationModel');

const ProgramEnrollment = sequelize.define('ProgramEnrollment', {
  enrollment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  program_id: {
    type: DataTypes.INTEGER,
    references: {
      model: FinancialEducationProgram,
      key: 'program_id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  enrollment_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  completion_status: {
    type: DataTypes.ENUM('enrolled', 'completed', 'dropped'),
    defaultValue: 'enrolled'
  }
}, {
  tableName: 'program_enrollment',
  timestamps: false
});

ProgramEnrollment.belongsTo(FinancialEducationProgram, { foreignKey: 'program_id' });
ProgramEnrollment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = ProgramEnrollment;
