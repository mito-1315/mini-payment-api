const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware.js');
const getHistory = require('../controllers/historyController.js')

router.use( protect )
router.get('/', getHistory)

module.exports = router;