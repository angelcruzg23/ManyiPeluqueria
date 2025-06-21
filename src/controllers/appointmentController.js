const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Owner = require('../models/Owner');
const Service = require('../models/Service');

const createAppointment = async (req, res) => {
  try {
    const { petId, dateTime, description, serviceIds } = req.body;

    // Crear la cita
    const newAppointment = await Appointment.create({ petId, dateTime, description });

    // Asociar servicios si vienen
    /*    if (serviceIds && serviceIds.length > 0) {
          await newAppointment.setServices(serviceIds);
        }*/

    if (Array.isArray(serviceIds) && serviceIds.every(id => Number.isInteger(id))) {
      await newAppointment.setServices(serviceIds);
    }

    // Recargar la cita con detalles
    const appointmentWithDetails = await Appointment.findByPk(newAppointment.id, {
      include: [
        { model: Pet, include: [Owner] },
        { model: Service }
      ]
    });

    res.status(201).json(appointmentWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agendar la cita con servicios' });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Pet,
          include: [Owner]
        },
        {
          model: Service
        }
      ],
      order: [['dateTime', 'ASC']]
    });
    res.json(appointments);
  } catch (error) {
    console.error('Error en getAllAppointments:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

const getAppointmentWithTotal = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: Pet,
          include: [Owner]
        },
        {
          model: Service
        }
      ]
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    const services = appointment.Services;
    const total = services.reduce((sum, s) => sum + parseFloat(s.price), 0);

    res.json({
      appointment,
      services,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });

    appointment.status = status;
    await appointment.save();

    res.json({ message: 'Estado actualizado correctamente', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado de la cita' });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentWithTotal,
  updateAppointmentStatus
};
