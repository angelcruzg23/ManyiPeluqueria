const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Owner = sequelize.define('Owner', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Owner;
