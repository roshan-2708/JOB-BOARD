const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController');
const { protest } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protest, getUserProfile);

module.exports = router;