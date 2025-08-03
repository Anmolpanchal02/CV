import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';

function ClassicTemplate({ cvData }) {
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
        <div className="bg-white text-gray-800 p-10 font-serif max-w-full print:p-0">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold">{personalInfo?.name || 'Your Name'}</h1>
                <p className="text-lg text-gray-600">{personalInfo?.title || 'Your Job Title'}</p>
                <div className="flex justify-center items-center gap-4 mt-2 text-sm text-gray-600">
                    {personalInfo?.phone && <span className="flex items-center gap-1"><FaPhone /> {personalInfo.phone}</span>}
                    {personalInfo?.email && <span className="flex items-center gap-1"><FaEnvelope /> {personalInfo.email}</span>}
                    {personalInfo?.linkedin && <span className="flex items-center gap-1"><FaLinkedin /> {personalInfo.linkedin}</span>}
                    {personalInfo?.github && <span className="flex items-center gap-1"><FaGithub /> {personalInfo.github}</span>}
                </div>
            </header>

            <main className="space-y-6">
                {summary?.text && (
                    <section>
                        <h2 className="text-xl font-bold border-b pb-1 mb-2">Summary</h2>
                        <p>{summary.text}</p>
                    </section>
                )}

                {experiences?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold border-b pb-1 mb-2">Experience</h2>
                        {experiences.map((exp, index) => (
                            <div className="mb-4" key={index}>
                                <div className="flex justify-between font-semibold">
                                    <h3>{exp.title}</h3>
                                    <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="italic text-gray-600">{exp.company}, {exp.location}</p>
                                <p className="mt-1">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold border-b pb-1 mb-2">Education</h2>
                        {education.map((edu, index) => (
                            <div className="mb-4" key={index}>
                                <div className="flex justify-between font-semibold">
                                    <h3>{edu.degree}</h3>
                                    <span>{edu.startDate} - {edu.endDate}</span>
                                </div>
                                <p className="italic text-gray-600">{edu.institution}, {edu.city}</p>
                                <p className="mt-1">{edu.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {skills?.list?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold border-b pb-1 mb-2">Skills</h2>
                        <ul className="list-disc list-inside space-y-1">
                            {skills.list.map((skill, index) => (
                                <li key={index}>{skill.name}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {projects?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold border-b pb-1 mb-2">Projects</h2>
                        {projects.map((proj, index) => (
                            <div className="mb-4" key={index}>
                                <div className="font-semibold">
                                    <h3>{proj.name}</h3>
                                </div>
                                {proj.link && <p className="text-blue-600"><a href={proj.link}>{proj.link}</a></p>}
                                <p className="mt-1">{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {custom?.title && (
                    <section>
                        <h2 className="text-xl font-bold border-b pb-1 mb-2">{custom.title}</h2>
                        <p>{custom.content}</p>
                    </section>
                )}
            </main>
        </div>
    );
}

export default ClassicTemplate;