const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { protest, authorized } = require('../middlewares/authMiddleware');
const { applyForJob,updateApplicationStatus, getMyApplication } = require('../controllers/applicationController');

router.post('/apply/:jobId', protest, authorized('candidate'), upload.single('resume'), applyForJob);
router.put('/:id/status', protest, authorized('employer'), updateApplicationStatus);
router.get('/my-applications', protest, authorized('candidate'), getMyApplication);

module.exports = router;