const express = require('express');
const { testApi, getHistory } = require('../controllers/testController');

const router = express.Router();

// Route to handle testing API
router.post('/', testApi);

// Route to get request history
router.get('/history', getHistory);

module.exports = router;
