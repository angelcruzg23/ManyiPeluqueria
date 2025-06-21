const Owner = require('../models/Owner');

const createOwner = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const owner = await Owner.create({ name, phone });
    res.status(201).json(owner);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear dueño' });
  }
};

const getOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener dueños' });
  }
};

module.exports = {
  createOwner,
  getOwners
};
