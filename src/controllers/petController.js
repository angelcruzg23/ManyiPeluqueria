const Pet = require('../models/Pet');
const Owner = require('../models/Owner');

const createPet = async (req, res) => {
  try {
    const { name, breed, age, ownerId } = req.body;
    const pet = await Pet.create({ name, breed, age, ownerId });
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear mascota' });
  }
};

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll({ include: Owner });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mascotas' });
  }
};

const getPetsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const pets = await Pet.findAll({
      where: { ownerId },
      include: Owner
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mascotas del dueño' });
  }
};

module.exports = {
  createPet,
  getAllPets,
  getPetsByOwner
};
