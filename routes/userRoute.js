const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser } = require('../controllers/userController');
// const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
