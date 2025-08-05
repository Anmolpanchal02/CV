import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

function ModernTemplate({ cvData }) {
    if (!cvData) {
        return <div className="p-4 text-center" style={{ color: '#6B7280' }}>Loading CV preview...</div>;
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
        <div className="p-8 font-sans max-w-full print:p-0" style={{ backgroundColor: '#ffffff', color: '#1F2937' }}>
            <header className="text-center pb-6 border-b-2 mb-6" style={{ borderColor: '#1F2937' }}>
                <h1 className="text-4xl font-extrabold uppercase tracking-wider" style={{ color: '#111827' }}>{personalInfo?.name || 'Your Name'}</h1>
                <p className="text-xl mt-1 font-light" style={{ color: '#4B5563' }}>{personalInfo?.title || 'Your Job Title'}</p>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm" style={{ color: '#4B5563' }}>
                    {personalInfo?.email && (
                        <span className="flex items-center gap-1"><FaEnvelope style={{ color: '#3B82F6' }} /> {personalInfo.email}</span>
                    )}
                    {personalInfo?.phone && (
                        <span className="flex items-center gap-1"><FaPhone style={{ color: '#3B82F6' }} /> {personalInfo.phone}</span>
                    )}
                    {personalInfo?.linkedin && (
                        <span className="flex items-center gap-1"><FaLinkedin style={{ color: '#3B82F6' }} /> {personalInfo.linkedin}</span>
                    )}
                    {personalInfo?.github && (
                        <span className="flex items-center gap-1"><FaGithub style={{ color: '#3B82F6' }} /> {personalInfo.github}</span>
                    )}
                    {personalInfo?.website && (
                        <span className="flex items-center gap-1"><FaGlobe style={{ color: '#3B82F6' }} /> {personalInfo.website}</span>
                    )}
                </div>
            </header>

            <main className="grid gap-6">
                {summary?.text && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b pb-1 mb-3" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>Summary</h2>
                        <p className="italic" style={{ color: '#374151' }}>{summary.text}</p>
                    </section>
                )}

                {experiences?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b pb-1 mb-3" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>Experience</h2>
                        {experiences.map((exp, index) => (
                            <div className="mb-4" key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>{exp.title} at {exp.company}</h3>
                                        <p className="text-sm" style={{ color: '#6B7280' }}>{exp.location}</p>
                                    </div>
                                    <p className="text-sm" style={{ color: '#6B7280' }}>{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-sm mt-1" style={{ color: '#374151' }}>{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {education?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b pb-1 mb-3" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>Education</h2>
                        {education.map((edu, index) => (
                            <div className="mb-4" key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>{edu.degree} from {edu.institution}</h3>
                                        <p className="text-sm" style={{ color: '#6B7280' }}>{edu.city}</p>
                                    </div>
                                    <p className="text-sm" style={{ color: '#6B7280' }}>{edu.startDate} - {edu.endDate}</p>
                                </div>
                                <p className="text-sm mt-1" style={{ color: '#374151' }}>{edu.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {skills?.list?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b pb-1 mb-3" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.list.map((skill, index) => (
                                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#E5E7EB', color: '#374151' }} key={index}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
                
                {projects?.length > 0 && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b pb-1 mb-3" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>Projects</h2>
                        {projects.map((proj, index) => (
                            <div className="mb-4" key={index}>
                                <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>{proj.name}</h3>
                                {proj.link && <p className="text-sm hover:underline" style={{ color: '#2563EB' }}><a href={proj.link}>{proj.link}</a></p>}
                                <p className="text-sm mt-1" style={{ color: '#374151' }}>{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                {custom?.title && (
                    <section className="mb-4">
                        <h2 className="text-2xl font-bold uppercase border-b pb-1 mb-3" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>{custom.title}</h2>
                        <div className="prose max-w-none" style={{ color: '#374151' }}>
                            <p>{custom.content}</p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default ModernTemplate;