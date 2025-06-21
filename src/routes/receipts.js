const express = require('express');
const router = express.Router();
const { renderReceipt } = require('../controllers/receiptController');

router.get('/:id', renderReceipt);

module.exports = router;
