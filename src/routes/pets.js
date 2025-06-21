const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post('/', petController.createPet);
router.get('/', petController.getAllPets);
router.get('/owner/:ownerId', petController.getPetsByOwner);

module.exports = router;
