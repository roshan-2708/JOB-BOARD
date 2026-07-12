const express = require('express');
const router = express.Router();
const { protest, authorized } = require('../middlewares/authMiddleware');
const { createJob, getAllJobs, getJobById } = require('../controllers/jobController');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/create', protest, authorized('employer'), createJob);

module.exports = router;