const Application = require('../models/application');
const Job = require('../models/job');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { folder: 'job_board_resumes', resource_type: 'auto' },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        const readableStream = new Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null);
        readableStream.pipe(stream);
    });
};


exports.applyForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const candidateId = req.user._id;

        const job = await Job.findById(jobId);
        if (!job || !job.isActive) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this job',
            });
        }

        const alreadyApplied = await Application.findOne({ job: jobId, candidate: candidateId });

        if (alreadyApplied) {
            return res, status(400).json({
                success: false,
                message: 'You have already applied for this job',
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload your resume",
            });
        }
        const uploadResult = await streamUpload(req.file.buffer);

        const application = await Application.create({
            job: jobId,
            candidate: candidateId,
            resumeUrl: uploadResult.secure_url,
        });

        

        res.status(201).json({
            success: true,
            message: "Application is successfully submitted",
            data: application,
        });
    } catch (error) {
        console.error("Error in apply for application controller", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
