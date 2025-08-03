import React, { useState } from 'react';

function CustomSection({ sectionData, updateCvData }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newCustomData = {
            ...sectionData,
            [name]: value,
        };
        updateCvData('custom', newCustomData);
    };

    if (!sectionData) {
        return <p className="text-red-500">Custom section data not found.</p>;
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <h4 className="text-lg font-semibold text-gray-800">Custom Section</h4>
                <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
                <div className="mt-4 space-y-3">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Section Title</label>
                        <input
                            type="text"
                            name="title"
                            value={sectionData.title || ''}
                            onChange={handleChange}
                            placeholder="e.g., Awards, Certifications"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            name="content"
                            value={sectionData.content || ''}
                            onChange={handleChange}
                            placeholder="Describe your awards or list your certifications here."
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomSection;