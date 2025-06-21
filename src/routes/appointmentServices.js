const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentServiceController');

router.post('/', controller.assignServicesToAppointment);

module.exports = router;
