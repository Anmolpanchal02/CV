import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

function EducationSection({ sectionData, updateCvData }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const educationItems = sectionData || [];

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = educationItems.map((edu, i) =>
            i === index ? { ...edu, [name]: value } : edu
        );
        updateCvData('education', updatedEducation);
    };

    const handleAddEducation = () => {
        const newEducation = {
            degree: '',
            institution: '',
            city: '',
            startDate: '',
            endDate: '',
            description: '',
        };
        updateCvData('education', [...educationItems, newEducation]);
    };

    const handleDeleteEducation = (index) => {
        const updatedEducation = educationItems.filter((_, i) => i !== index);
        updateCvData('education', updatedEducation);
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <h4 className="text-lg font-semibold text-gray-800">Education</h4>
                <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
                <div className="mt-4 space-y-4">
                    {educationItems.map((edu, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="text-md font-semibold text-gray-700">Education #{index + 1}</h5>
                                <button
                                    onClick={() => handleDeleteEducation(index)}
                                    className="text-red-500 hover:text-red-700 transition"
                                    title="Delete Education"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Degree</label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={edu.degree}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="B.Tech in Computer Science"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Institution</label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={edu.institution}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Delhi Technological University"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={edu.city}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="New Delhi"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col w-1/2">
                                        <label className="text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="text"
                                            name="startDate"
                                            value={edu.startDate}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Aug 2018"
                                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                        <label className="text-sm font-medium text-gray-700">End Date</label>
                                        <input
                                            type="text"
                                            name="endDate"
                                            value={edu.endDate}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Jul 2022"
                                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={edu.description}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Courses included Data Structures, Algorithms..."
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddEducation} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2">
                        <FaPlus /> Add New Education
                    </button>
                </div>
            )}
        </div>
    );
}

export default EducationSection;