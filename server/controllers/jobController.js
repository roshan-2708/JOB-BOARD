const Job = require('../models/job');
const Application = require('../models/application');

exports.createJob = async (req, res) => {
    try {
        const { title, description, location, salary, currency, requirements, type, experience, tags, skills, } = req.body;

        if (!title || !description || !location || !salary || !currency || !requirements || !type || !experience || !tags || !skills) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const formattedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
        const formattedSkills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());

        const job = await Job.create({
            title,
            description,
            location,
            salary,
            currency,
            requirements,
            type,
            experience,
            tags: formattedTags,
            skills: formattedSkills,
            employer: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Job Posted Successfully",
            data: job,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error in createJob controller",
        })
    }
}

exports.getAllJobs = async (req, res) => {
    try {
        const { keyword, location, type, experience } = req.query;
        let query = { isActive: true };
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (location) query.location = location;
        if (type) query.type = type;
        if (experience) query.experience = experience;

        const jobs = await Job.find(query).populate('employer', 'name email').sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Error in getting all jobs",
        });
    }
}

exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate('employer', 'name email');

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error("Error in getJobById controller:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.getEmployersJob = async (req, res) => {
    try {
        const jobs = await Job.find({ employer: req.user._id }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "No jobs found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: jobs,
            count: jobs.length,
        });
    } catch (error) {
        console.error("Error in get employer jobs controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        });
    }
}

exports.getJobApplications = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job is not found",
            });
        }

        if (job.employer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied to view applications for this job"
            })
        }

        const application = await Application.find({
            job: jobId
        }).populate('candidate', 'name email').sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: application.length,
            data: application,
        });

    } catch (error) {
        console.log("Error in get job application controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        });
    }
}