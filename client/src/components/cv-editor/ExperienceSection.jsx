import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

function ExperienceSection({ sectionData, updateCvData }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const experiences = sectionData || [];

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = experiences.map((exp, i) =>
            i === index ? { ...exp, [name]: value } : exp
        );
        updateCvData('experience', updatedExperiences);
    };

    const handleAddExperience = () => {
        const newExperience = {
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
        };
        updateCvData('experience', [...experiences, newExperience]);
    };

    const handleDeleteExperience = (index) => {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        updateCvData('experience', updatedExperiences);
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <h4 className="text-lg font-semibold text-gray-800">Experience</h4>
                <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
                <div className="mt-4 space-y-4">
                    {experiences.map((exp, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="text-md font-semibold text-gray-700">Experience #{index + 1}</h5>
                                <button
                                    onClick={() => handleDeleteExperience(index)}
                                    className="text-red-500 hover:text-red-700 transition"
                                    title="Delete Experience"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={exp.title}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Software Engineer"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={exp.company}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Google"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={exp.location}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Mountain View, CA"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col w-1/2">
                                        <label className="text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="text"
                                            name="startDate"
                                            value={exp.startDate}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Jan 2020"
                                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                        <label className="text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="text"
                                            name="endDate"
                                            value={exp.endDate}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Present or Dec 2022"
                                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={exp.description}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Led a team in developing a new feature..."
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddExperience} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2">
                        <FaPlus /> Add New Experience
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExperienceSection;