const express = require('express');
const fetchAllTasks = require('../controllers/taskController');
const router = express.Router();
const { Tast } = require('../models');

router.get('/', fetchAllTasks);

module.exports = router;
