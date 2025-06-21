const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

const sequelize = require('./src/config/database');
// Importa los modelos
const Owner = require('./src/models/Owner');
const Service = require('./src/models/Service');
const Pet = require('./src/models/Pet');
const Appointment = require('./src/models/Appointment');
const AppointmentService = require('./src/models/AppointmentService');

// Importa las rutas
const ownerRoutes = require('./src/routes/owners');
const petRoutes = require('./src/routes/pets');



const appointmentServiceRoutes = require('./src/routes/appointmentServices');
const service = require('./src/routes/services');
const serviceRoutes = require('./src/routes/services');
const appointmentRoutes = require('./src/routes/appointments');
const receiptRoutes = require('./src/routes/receipts');

// 👇 REGISTRAR ASOCIACIÓN
Appointment.belongsToMany(Service, {
  through: AppointmentService,
  foreignKey: 'appointmentId'
});
Service.belongsToMany(Appointment, {
  through: AppointmentService,
  foreignKey: 'serviceId'
});

app.use(express.json());

// Usa las rutas
app.use('/owners', ownerRoutes);
app.use('/pets', petRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/services', serviceRoutes);
app.use('/appointment-services', appointmentServiceRoutes);
app.use('/receipts', receiptRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Peluquería Canina API funcionando 🐶');
});

sequelize.sync().then(() => {
  console.log('📦 Base de datos y tablas listas');

  // Crea un dueño de ejemplo
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });

});
