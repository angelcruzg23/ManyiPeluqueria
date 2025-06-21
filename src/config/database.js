const { Sequelize } = require('sequelize');

// Base de datos SQLite (archivo local)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/peluqueria.sqlite',
  logging: false
});

module.exports = sequelize;
