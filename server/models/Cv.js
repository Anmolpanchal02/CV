import mongoose from 'mongoose';

const cvSectionSchema = mongoose.Schema({
    type: {
        type: String, // e.g., 'personal', 'experience', 'education', 'skills', 'projects', 'custom'
        required: true,
    },
    order: {
        type: Number, // For ordering sections in the CV
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Stores the actual data for the section (e.g., job details, skill list)
        required: true,
    },
});

const cvSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Links CV to a user
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled CV',
    },
    templateName: {
        type: String, // e.g., 'modern', 'classic'
        default: 'modern',
    },
    sections: [cvSectionSchema], // Array of CV sections
}, {
    timestamps: true,
});

const Cv = mongoose.model('Cv', cvSchema);

export default Cv;