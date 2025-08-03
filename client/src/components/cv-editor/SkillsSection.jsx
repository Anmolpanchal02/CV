import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

function SkillsSection({ sectionData, updateCvData }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [newSkillName, setNewSkillName] = useState('');

    const skillsList = sectionData?.list || [];

    const handleAddSkill = (e) => {
        e.preventDefault(); 
        if (newSkillName.trim()) {
            const updatedSkills = [...skillsList, { name: newSkillName }];
            updateCvData('skills', { list: updatedSkills });
            setNewSkillName('');
        }
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = skillsList.filter((_, i) => i !== index);
        updateCvData('skills', { list: updatedSkills });
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <h4 className="text-lg font-semibold text-gray-800">Skills</h4>
                <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
                <div className="mt-4">
                    <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            placeholder="Enter a new skill"
                            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            <FaPlus />
                        </button>
                    </form>
                    <ul className="space-y-2">
                        {skillsList.map((skill, index) => (
                            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                                <span className="text-gray-800">{skill.name}</span>
                                <button
                                    onClick={() => handleDeleteSkill(index)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SkillsSection;