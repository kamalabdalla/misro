// src/config/dbConfig.js
//const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
//const sequelize = new Sequelize('smf_db', 'root', '', {
//  host: 'localhost', // Assuming your database is running locally
//  dialect: 'mysql', // Specify 'mysql' for MariaDB
//  define: {
//    timestamps: false // Disable Sequelize's default timestamps (createdAt, updatedAt)
//  }
//});

// src/config/dbConfig.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'smf_db', // database name
  'root',   // username
  '',       // password (empty in your case)
  {
    host: 'localhost', // or your DB host
    dialect: 'mysql'
  }
);

module.exports = sequelize;

