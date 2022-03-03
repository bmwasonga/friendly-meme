const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { user } = require('../models');
const { registerUser, loginUser } = require('../controllers/userController');

// router.post('/register', async (req, res) => {
//   const { phone, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const response = await user.create({
//       phone,
//       password: hashedPassword,
//       role,
//     });
//     return res.json(response);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: { error } });
//   }
// });

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
