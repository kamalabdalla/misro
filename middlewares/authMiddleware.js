const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const tokenBlacklist = [];

// Add token to blacklist
function addToBlacklist(token) {
  tokenBlacklist.push(token);
}

// Check if token is blacklisted
function isTokenBlacklisted(token) {
  return tokenBlacklist.includes(token);
}

// Middleware to authenticate and verify JWT token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
const tokenVal = token.split(' ')[1];
console.log(tokenVal);
  if (isTokenBlacklisted(tokenVal)) {
    return res.status(401).json({ message: 'Token has been revoked.' });
  }

  try {
    const decoded = jwt.verify(tokenVal, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' +err});
  }
};

// Function to find user by username
const findUserByUsername = async (username) => {
  try {
    return User.findOne({
      where: {
        u_name: username
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(403).json({ message: 'Username or password cannot be empty' });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(403).json({ message: 'Invalid username or password !' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(password)
    if (!passwordMatch) {
      return res.status(403).json({ message: 'Invalid username or password ..' });
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
      expiresIn: process.env.EXPIRE,
    });

    const data = {
      token: token,
      user
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to logout user
const logout = (req, res) => {
  const token = req.headers.authorization;
  addToBlacklist(token);
  return res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  authenticate,
  loginUser,
  logout
};
