const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description : {
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    requirements:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    
    experience: {
        type: String,
        required: true
    },

    tags: {
        type: [String],
        required: true
    },

    skills: {
        type: [String],
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    }

}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);