const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController'); // asegúrate del nombre y ruta

router.post('/', ownerController.createOwner);
router.get('/', ownerController.getOwners);

module.exports = router;
