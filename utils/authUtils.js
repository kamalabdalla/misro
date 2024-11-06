// src/utils/authUtils.js (or any appropriate file)
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateJwtToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' }); // Customize expiresIn as needed
};

module.exports = { generateJwtToken };
