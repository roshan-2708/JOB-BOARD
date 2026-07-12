const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    resumeUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'reviewed'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

// one candidate can apply for one job only once
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);