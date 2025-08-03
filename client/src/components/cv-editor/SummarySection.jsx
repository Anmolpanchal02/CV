import React, { useState } from 'react';

function SummarySection({ sectionData, updateCvData }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleChange = (e) => {
        const { value } = e.target;
        updateCvData('summary', { text: value });
    };

    const summaryText = sectionData?.text || '';

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <h4 className="text-lg font-semibold text-gray-800">Summary</h4>
                <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
                <div className="mt-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Professional Summary</label>
                        <textarea
                            name="text"
                            value={summaryText}
                            onChange={handleChange}
                            placeholder="Write a brief summary about your professional experience and career goals."
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default SummarySection;