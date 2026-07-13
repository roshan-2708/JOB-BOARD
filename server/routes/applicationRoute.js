const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { protest, authorized } = require('../middlewares/authMiddleware');
const { applyForJob } = require('../controllers/applicationController');

router.post('/apply/:jobId', protest, authorized('candidate'), upload.single('resume'), applyForJob);

module.exports = router;