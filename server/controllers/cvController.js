import asyncHandler from '../utils/asyncHandler.js';
import Cv from '../models/Cv.js';

// @desc    Create a new CV
// @route   POST /api/cv
// @access  Private
const createCv = asyncHandler(async (req, res) => {
    const { title, templateName, sections } = req.body;

    const cv = new Cv({
        user: req.user._id, // User from authMiddleware
        title,
        templateName,
        sections,
    });

    const createdCv = await cv.save();
    res.status(201).json(createdCv);
});

// @desc    Get all CVs for a user
// @route   GET /api/cv
// @access  Private
const getMyCvs = asyncHandler(async (req, res) => {
    const cvs = await Cv.find({ user: req.user._id });
    res.json(cvs);
});

// @desc    Get a single CV by ID
// @route   GET /api/cv/:id
// @access  Private
const getCvById = asyncHandler(async (req, res) => {
    const cv = await Cv.findById(req.params.id);

    if (cv && cv.user.toString() === req.user._id.toString()) { // Ensure user owns the CV
        res.json(cv);
    } else {
        res.status(404);
        throw new Error('CV not found or unauthorized');
    }
});

// @desc    Update a CV
// @route   PUT /api/cv/:id
// @access  Private
const updateCv = asyncHandler(async (req, res) => {
    const { title, templateName, sections } = req.body;

    const cv = await Cv.findById(req.params.id);

    if (cv && cv.user.toString() === req.user._id.toString()) {
        cv.title = title || cv.title;
        cv.templateName = templateName || cv.templateName;
        cv.sections = sections || cv.sections; // Replace all sections for simplicity, or handle granular updates

        const updatedCv = await cv.save();
        res.json(updatedCv);
    } else {
        res.status(404);
        throw new Error('CV not found or unauthorized');
    }
});

// @desc    Delete a CV
// @route   DELETE /api/cv/:id
// @access  Private
const deleteCv = asyncHandler(async (req, res) => {
    const cv = await Cv.findById(req.params.id);

    if (cv && cv.user.toString() === req.user._id.toString()) {
        await Cv.deleteOne({ _id: cv._id }); // Use deleteOne with query
        res.json({ message: 'CV removed' });
    } else {
        res.status(404);
        throw new Error('CV not found or unauthorized');
    }
});

export { createCv, getMyCvs, getCvById, updateCv, deleteCv };