import React, { useState } from 'react';

function PersonalInfoSection({ sectionData, updateCvData }) {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newPersonalInfo = {
            ...sectionData,
            [name]: value,
        };
        updateCvData('personal', newPersonalInfo);
    };

    if (!sectionData) {
        return <p className="text-red-500">Personal Info section data not found.</p>;
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <h4 className="text-lg font-semibold text-gray-800">Personal Info</h4>
                <span className="text-gray-500">{isExpanded ? '▲' : '▼'}</span>
            </div>
            {isExpanded && (
                <div className="mt-4 space-y-3">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={sectionData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={sectionData.title}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={sectionData.email}
                            onChange={handleChange}
                            placeholder="johndoe@example.com"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={sectionData.phone}
                            onChange={handleChange}
                            placeholder="+91-9876543210"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">LinkedIn</label>
                        <input
                            type="text"
                            name="linkedin"
                            value={sectionData.linkedin}
                            onChange={handleChange}
                            placeholder="linkedin.com/in/johndoe"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">GitHub</label>
                        <input
                            type="text"
                            name="github"
                            value={sectionData.github}
                            onChange={handleChange}
                            placeholder="github.com/johndoe"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={sectionData.address}
                            onChange={handleChange}
                            placeholder="New Delhi, India"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PersonalInfoSection;