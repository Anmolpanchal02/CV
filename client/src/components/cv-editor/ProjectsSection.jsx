import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

function ProjectsSection({ sectionData, updateCvData }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const projects = sectionData || [];

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProjects = projects.map((project, i) =>
            i === index ? { ...project, [name]: value } : project
        );
        updateCvData('projects', updatedProjects);
    };

    const handleAddProject = () => {
        const newProject = {
            name: '',
            link: '',
            description: '',
        };
        updateCvData('projects', [...projects, newProject]);
    };

    const handleDeleteProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        updateCvData('projects', updatedProjects);
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <h4 className="text-lg font-semibold text-gray-800">Projects</h4>
                <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
                <div className="mt-4 space-y-4">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="text-md font-semibold text-gray-700">Project #{index + 1}</h5>
                                <button
                                    onClick={() => handleDeleteProject(index)}
                                    className="text-red-500 hover:text-red-700 transition"
                                    title="Delete Project"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Project Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={project.name}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="CV Builder App"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Project Link (Optional)</label>
                                    <input
                                        type="text"
                                        name="link"
                                        value={project.link}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="github.com/my-project"
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={project.description}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="A web application to create and manage professional CVs."
                                        className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleAddProject} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2">
                        <FaPlus /> Add New Project
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProjectsSection;