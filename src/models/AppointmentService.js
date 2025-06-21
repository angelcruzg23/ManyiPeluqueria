/*const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Appointment = require('./Appointment');
const Service = require('./Service');

const AppointmentService = sequelize.define('AppointmentService', {}, {
  timestamps: true
});

// Relaciones Many-to-Many
Appointment.belongsToMany(Service, {
  through: AppointmentService,
  foreignKey: 'appointmentId'
});
Service.belongsToMany(Appointment, {
  through: AppointmentService,
  foreignKey: 'serviceId'
});

module.exports = AppointmentService;
*/
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AppointmentService = sequelize.define('AppointmentService', {
  appointmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Appointments',
      key: 'id'
    }
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Services',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = AppointmentService;
