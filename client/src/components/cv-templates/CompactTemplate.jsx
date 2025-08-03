import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

function CompactTemplate({ cvData }) {
    if (!cvData) {
        return <div className="p-4 text-center text-gray-500">Loading CV preview...</div>;
    }

    const getSectionData = (type) => {
        const section = cvData.sections.find(s => s.type === type);
        return section?.data;
    };

    const personalInfo = getSectionData('personal');
    const summary = getSectionData('summary');
    const experiences = getSectionData('experience');
    const education = getSectionData('education');
    const skills = getSectionData('skills');
    const projects = getSectionData('projects');
    const custom = getSectionData('custom');

    return (
        <div className="bg-white text-gray-800 p-8 font-sans max-w-full print:p-0 leading-snug text-sm">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-extrabold uppercase tracking-wider text-gray-900">{personalInfo?.name || 'Your Name'}</h1>
                <p className="text-lg text-gray-600 font-light">{personalInfo?.title || 'Your Job Title'}</p>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-600">
                    {personalInfo?.address && (
                        <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-gray-400" /> {personalInfo.address}</span>
                    )}
                    {personalInfo?.phone && (
                        <span className="flex items-center gap-1"><FaPhone className="text-gray-400" /> {personalInfo.phone}</span>
                    )}
                    {personalInfo?.email && (
                        <span className="flex items-center gap-1"><FaEnvelope className="text-gray-400" /> {personalInfo.email}</span>
                    )}
                    {personalInfo?.linkedin && (
                        <span className="flex items-center gap-1"><FaLinkedin className="text-gray-400" /> {personalInfo.linkedin}</span>
                    )}
                    {personalInfo?.github && (
                        <span className="flex items-center gap-1"><FaGithub className="text-gray-400" /> {personalInfo.github}</span>
                    )}
                    {personalInfo?.website && (
                        <span className="flex items-center gap-1"><FaGlobe className="text-gray-400" /> {personalInfo.website}</span>
                    )}
                </div>
            </header>

            <main className="space-y-6">
                {summary?.text && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-1 mb-2 text-gray-800">Summary</h2>
                        <p className="text-gray-700">{summary.text}</p>
                    </section>
                )}

                {experiences?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-1 mb-2 text-gray-800">Experience</h2>
                        {experiences.map((exp, index) => (
                            <div className="mb-3" key={index}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-900">{exp.title} - {exp.company}</h3>
                                    <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-xs text-gray-600 italic mb-1">{exp.location}</p>
                                <p className="text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-1 mb-2 text-gray-800">Education</h2>
                        {education.map((edu, index) => (
                            <div className="mb-3" key={index}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-gray-900">{edu.degree}, {edu.institution}</h3>
                                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                </div>
                                <p className="text-xs text-gray-600 italic mb-1">{edu.city}</p>
                                <p className="text-gray-700">{edu.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {skills?.list?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-1 mb-2 text-gray-800">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.list.map((skill, index) => (
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs" key={index}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
                
                {projects?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-1 mb-2 text-gray-800">Projects</h2>
                        {projects.map((proj, index) => (
                            <div className="mb-3" key={index}>
                                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                                {proj.link && <p className="text-xs text-blue-600 hover:underline"><a href={proj.link}>{proj.link}</a></p>}
                                <p className="text-gray-700">{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {custom?.title && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b border-gray-400 pb-1 mb-2 text-gray-800">{custom.title}</h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>{custom.content}</p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default CompactTemplate;