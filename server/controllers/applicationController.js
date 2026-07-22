const Application = require('../models/application');
const Job = require('../models/job');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');
const sendEmail = require('../utils/sendEmail');

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

exports.updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        if (!['reviewed', 'accepted', 'rejected', 'shortlisted'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status provided",
            });
        }

        const application = await Application.findById(applicationId).populate('candidate', 'name email').populate('job', 'title employer');

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        if (application.job.employer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this application" });
        }

        application.status = status;
        await application.save();

        const candidateEmail = application.candidate.email;
        const candidateName = application.candidate.name;
        const jobTitle = application.job.title;

        let emailSubject = '';
        let emailMessage = '';

        if (status === 'accepted') {
            emailSubject = `Congratulations! You have been accepted for ${jobTitle}`;
            emailMessage = `Hello ${candidateName},\n\nGreat news! Your application for the position of ${jobTitle} has been accepted. The employer will contact you shortly for the next steps.\n\nBest Regards,\nJob Board Team`;
        } else if (status === 'shortlisted') {
            emailSubject = `Congratulations! You have been shortlisted for ${jobTitle}`;
            emailMessage = `Hello ${candidateName},\n\nGreat news! Your application for the position of ${jobTitle} has been shortlisted. The employer will contact you shortly for the next steps.\n\nBest Regards,\nJob Board Team`;
        } else if (status === 'rejected') {
            emailSubject = `Update on your application for ${jobTitle}`;
            emailMessage = `Hello ${candidateName},\n\nThank you for applying for the ${jobTitle} position. Unfortunately, the employer has decided to move forward with other candidates at this time.\n\nKeep applying and best of luck with your job search!\n\nBest Regards,\nJob Board Team`;
        } else if (status === 'reviewed') {
            emailSubject = `Your application for ${jobTitle} is under review`;
            emailMessage = `Hello ${candidateName},\n\nThe employer has started reviewing your application for the ${jobTitle} position. We will keep you updated on the final status.\n\nBest Regards,\nJob Board Team`;
        }

        try {
            await sendEmail({
                email: candidateEmail,
                subject: emailSubject,
                message: emailMessage,
            });
        } catch (emailError) {
            console.error("Email could not be sent:", emailError);
        }

        res.status(200).json({
            success: true,
            message: `Application marked as ${status} and email sent to candidate`,
            data: application
        });

    } catch (error) {
        console.error("Error in update application status controller", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

exports.getMyApplication = async (req, res) => {
    try {
        const application = await Application.find({ candidate: req.user._id }).populate({
            path: 'job',
            select: 'title location type salary isActive employer',
            populate: {
                path: 'employer',
                select: 'name email',
            }
        });

        res.status(200).json({
            success: true,
            count: application.length,
            data: application,
        });
    } catch (error) {
        console.log("Error in get my application controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

