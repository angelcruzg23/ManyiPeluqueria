const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/:id/details', appointmentController.getAppointmentWithTotal);
router.put('/:id/status', appointmentController.updateAppointmentStatus);


module.exports = router;
