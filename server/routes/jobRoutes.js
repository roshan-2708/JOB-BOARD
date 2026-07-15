const express = require('express');
const router = express.Router();
const { protest, authorized } = require('../middlewares/authMiddleware');
const { createJob, getAllJobs, getJobById,getEmployersJob,getJobApplications } = require('../controllers/jobController');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/create', protest, authorized('employer'), createJob);
router.get('/employer/my-jobs', protest, authorized('employer'), getEmployersJob);
router.get('/application/:jobId', protest, authorized('employer'), getJobApplications);

module.exports = router;