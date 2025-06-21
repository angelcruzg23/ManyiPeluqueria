const Service = require('../models/Service');

const createService = async (req, res) => {
  try {
    const { name, price } = req.body;
    const service = await Service.create({ name, price });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

module.exports = {
  createService,
  getAllServices
};
