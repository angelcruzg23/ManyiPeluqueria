const Owner = require('../models/Owner');
const Pet = require('../models/Pet');

const createOwner = async (req, res) => {
  try {
    const { name, phone, pets } = req.body;

    const owner = await Owner.create({ name, phone });

    if (Array.isArray(pets) && pets.length > 0) {
      for (const pet of pets) {
        await Pet.create({ ...pet, ownerId: owner.id });
      }
    }

    const registeredPets = await Pet.findAll({ where: { ownerId: owner.id } });

    res.status(201).json({ ...owner.toJSON(), pets: registeredPets });
  } catch (error) {
    console.error('Error al crear dueño y mascotas:', error);
    res.status(500).json({ error: 'Error al crear dueño y mascotas' });
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
