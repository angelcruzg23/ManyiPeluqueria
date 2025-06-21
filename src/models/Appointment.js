const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pet = require('./Pet');

const Appointment = sequelize.define('Appointment', {
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  status: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'pending' // puede ser 'pending', 'in-progress', 'completed'
}
});

// Relación: una mascota puede tener muchas citas
Pet.hasMany(Appointment, { foreignKey: 'petId' });
Appointment.belongsTo(Pet, { foreignKey: 'petId' });

module.exports = Appointment;
