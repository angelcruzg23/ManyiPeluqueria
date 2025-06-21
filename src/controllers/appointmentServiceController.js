const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

const assignServicesToAppointment = async (req, res) => {
  try {
    const { appointmentId, serviceIds } = req.body;

    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });

    const services = await Service.findAll({
      where: { id: serviceIds }
    });

    await appointment.setServices(services); // set reemplaza todos
    res.json({ message: 'Servicios asignados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar servicios' });
  }
};
module.exports = { assignServicesToAppointment };
