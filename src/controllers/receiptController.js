const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Owner = require('../models/Owner');
const Service = require('../models/Service');

const renderReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: Pet, include: [Owner] },
        { model: Service }
      ]
    });

    if (!appointment) {
      return res.status(404).send('Cita no encontrada');
    }

    const services = appointment.Services;
    const total = services.reduce((sum, s) => sum + parseFloat(s.price), 0);

    res.render('receipt', { appointment, services, total });
  } catch (error) {
    res.status(500).send('Error al generar el recibo');
  }
};

module.exports = { renderReceipt };
