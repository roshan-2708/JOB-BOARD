const express = require('express');
const { register, login, getUserProfile, verifyEmail, resendVerificationEmail } = require('../controllers/authController');
const { protest } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protest, getUserProfile);
router.get('/verify-email/:token', verifyEmail);
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

module.exports = router;