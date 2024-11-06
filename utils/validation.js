// src/utils/validation.js

const Joi = require('joi');

const userSchema = Joi.object({
  u_name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  phone: Joi.string().max(15).optional(),
  address: Joi.string().max(255).optional(),
  date_of_birth: Joi.date().optional(),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
  role: Joi.string().valid('client', 'loan_officer', 'admin').required(),
  status: Joi.string().valid('active', 'inactive').optional()
});

const validateUser = (user) => {
  return userSchema.validate(user);
};

module.exports = {
  validateUser
};

