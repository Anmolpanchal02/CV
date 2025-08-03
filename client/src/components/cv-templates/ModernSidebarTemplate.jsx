import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

function ModernSidebarTemplate({ cvData }) {
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
        <div className="bg-white text-gray-800 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans max-w-full print:p-0">
            <aside className="col-span-1 bg-gray-50 p-6 space-y-6">
                <header>
                    <h1 className="text-3xl font-extrabold text-gray-900">{personalInfo?.name || 'Your Name'}</h1>
                    <p className="text-lg text-gray-600">{personalInfo?.title || 'Your Job Title'}</p>
                </header>

                <section>
                    <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2">Contact</h2>
                    <div className="space-y-2 text-sm">
                        {personalInfo?.phone && <div className="flex items-center gap-2"><FaPhone /><span>{personalInfo.phone}</span></div>}
                        {personalInfo?.email && <div className="flex items-center gap-2"><FaEnvelope /><span>{personalInfo.email}</span></div>}
                        {personalInfo?.address && <div className="flex items-center gap-2"><FaMapMarkerAlt /><span>{personalInfo.address}</span></div>}
                        {personalInfo?.linkedin && <div className="flex items-center gap-2"><FaLinkedin /><span>{personalInfo.linkedin}</span></div>}
                        {personalInfo?.github && <div className="flex items-center gap-2"><FaGithub /><span>{personalInfo.github}</span></div>}
                        {personalInfo?.website && <div className="flex items-center gap-2"><FaGlobe /><span>{personalInfo.website}</span></div>}
                    </div>
                </section>

                {skills?.list?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2">Skills</h2>
                        <ul className="list-none space-y-1 text-sm">
                            {skills.list.map((skill, index) => (
                                <li key={index}>{skill.name}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-1 mb-2">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="text-sm">
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-gray-600">{edu.institution}, {edu.city}</p>
                                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            <main className="col-span-2 p-6 space-y-6">
                {summary?.text && (
                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-1 mb-4">Summary</h2>
                        <p>{summary.text}</p>
                    </section>
                )}

                {experiences?.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-1 mb-4">Experience</h2>
                        <div className="space-y-4">
                            {experiences.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold">{exp.title} at {exp.company}</h3>
                                        <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                                    </div>
                                    <p className="text-sm italic text-gray-600">{exp.location}</p>
                                    <p className="mt-1">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects?.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-1 mb-4">Projects</h2>
                        <div className="space-y-4">
                            {projects.map((proj, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold">{proj.name}</h3>
                                    {proj.link && <p className="text-sm text-blue-600"><a href={proj.link}>{proj.link}</a></p>}
                                    <p className="mt-1">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {custom?.title && (
                    <section>
                        <h2 className="text-2xl font-bold border-b-2 border-gray-400 pb-1 mb-4">{custom.title}</h2>
                        <p>{custom.content}</p>
                    </section>
                )}
            </main>
        </div>
    );
}

export default ModernSidebarTemplate;