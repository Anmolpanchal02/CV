import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

function ModernTemplate({ cvData }) {
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
        <div className="bg-white text-gray-800 p-8 font-sans max-w-full print:p-0">
            <header className="text-center pb-6 border-b-2 border-gray-800 mb-6">
                <h1 className="text-4xl font-extrabold uppercase tracking-wider text-gray-900">{personalInfo?.name || 'Your Name'}</h1>
                <p className="text-xl text-gray-600 mt-1 font-light">{personalInfo?.title || 'Your Job Title'}</p>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-gray-600">
                    {personalInfo?.email && (
                        <span className="flex items-center gap-1"><FaEnvelope className="text-blue-500" /> {personalInfo.email}</span>
                    )}
                    {personalInfo?.phone && (
                        <span className="flex items-center gap-1"><FaPhone className="text-blue-500" /> {personalInfo.phone}</span>
                    )}
                    {personalInfo?.linkedin && (
                        <span className="flex items-center gap-1"><FaLinkedin className="text-blue-500" /> {personalInfo.linkedin}</span>
                    )}
                    {personalInfo?.github && (
                        <span className="flex items-center gap-1"><FaGithub className="text-blue-500" /> {personalInfo.github}</span>
                    )}
                    {personalInfo?.website && (
                        <span className="flex items-center gap-1"><FaGlobe className="text-blue-500" /> {personalInfo.website}</span>
                    )}
                </div>
            </header>

            <main className="grid gap-6">
                {summary?.text && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b border-gray-400 pb-1 mb-3 text-gray-800">Summary</h2>
                        <p className="text-gray-700 italic">{summary.text}</p>
                    </section>
                )}

                {experiences?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b border-gray-400 pb-1 mb-3 text-gray-800">Experience</h2>
                        {experiences.map((exp, index) => (
                            <div className="mb-4" key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{exp.title} at {exp.company}</h3>
                                        <p className="text-sm text-gray-500">{exp.location}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {education?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b border-gray-400 pb-1 mb-3 text-gray-800">Education</h2>
                        {education.map((edu, index) => (
                            <div className="mb-4" key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree} from {edu.institution}</h3>
                                        <p className="text-sm text-gray-500">{edu.city}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {skills?.list?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b border-gray-400 pb-1 mb-3 text-gray-800">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.list.map((skill, index) => (
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm" key={index}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
                
                {projects?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b border-gray-400 pb-1 mb-3 text-gray-800">Projects</h2>
                        {projects.map((proj, index) => (
                            <div className="mb-4" key={index}>
                                <h3 className="text-lg font-semibold text-gray-900">{proj.name}</h3>
                                {proj.link && <p className="text-sm text-blue-600 hover:underline"><a href={proj.link}>{proj.link}</a></p>}
                                <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {custom?.title && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b border-gray-400 pb-1 mb-3 text-gray-800">{custom.title}</h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>{custom.content}</p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default ModernTemplate;