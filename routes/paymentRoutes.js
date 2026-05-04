const express = require('express');
const router = express.Router();
const payment = require('../controllers/paymentController.js');
const protect = require('../middleware/authMiddleware.js');

router.use( protect )
router.post('/', payment)

module.exports = router;