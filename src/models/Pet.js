const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Owner = require('./Owner');

const Pet = sequelize.define('Pet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  }
});

// Relaciones
Owner.hasMany(Pet, { foreignKey: 'ownerId' });
Pet.belongsTo(Owner, { foreignKey: 'ownerId' });

module.exports = Pet;
