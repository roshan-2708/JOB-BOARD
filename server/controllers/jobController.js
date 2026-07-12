const Job = require('../models/job');

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