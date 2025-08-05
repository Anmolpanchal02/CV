import React from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

function CompactTemplate({ cvData }) {
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
        <div className="p-8 font-sans max-w-full print:p-0 leading-snug text-sm" style={{ backgroundColor: '#ffffff', color: '#1F2937' }}>
            <header className="text-center mb-6">
                <h1 className="text-3xl font-extrabold uppercase tracking-wider" style={{ color: '#111827' }}>
                    {personalInfo?.name || 'Your Name'}
                </h1>
                <p className="text-lg font-light" style={{ color: '#4B5563' }}>
                    {personalInfo?.title || 'Your Job Title'}
                </p>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-xs" style={{ color: '#4B5563' }}>
                    {personalInfo?.address && (
                        <span className="flex items-center gap-1">
                            <FaMapMarkerAlt style={{ color: '#9CA3AF' }} /> 
                            {personalInfo.address}
                        </span>
                    )}
                    {personalInfo?.phone && (
                        <span className="flex items-center gap-1">
                            <FaPhone style={{ color: '#9CA3AF' }} /> 
                            {personalInfo.phone}
                        </span>
                    )}
                    {personalInfo?.email && (
                        <span className="flex items-center gap-1">
                            <FaEnvelope style={{ color: '#9CA3AF' }} /> 
                            {personalInfo.email}
                        </span>
                    )}
                    {personalInfo?.linkedin && (
                        <span className="flex items-center gap-1">
                            <FaLinkedin style={{ color: '#9CA3AF' }} /> 
                            {personalInfo.linkedin}
                        </span>
                    )}
                    {personalInfo?.github && (
                        <span className="flex items-center gap-1">
                            <FaGithub style={{ color: '#9CA3AF' }} /> 
                            {personalInfo.github}
                        </span>
                    )}
                    {personalInfo?.website && (
                        <span className="flex items-center gap-1">
                            <FaGlobe style={{ color: '#9CA3AF' }} /> 
                            {personalInfo.website}
                        </span>
                    )}
                </div>
            </header>

            <main className="space-y-6">
                {summary?.text && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b pb-1 mb-2" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>
                            Summary
                        </h2>
                        <p style={{ color: '#374151' }}>
                            {summary.text}
                        </p>
                    </section>
                )}

                {experiences?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b pb-1 mb-2" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>
                            Experience
                        </h2>
                        {experiences.map((exp, index) => (
                            <div className="mb-3" key={index}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold" style={{ color: '#111827' }}>
                                        {exp.title} - {exp.company}
                                    </h3>
                                    <p className="text-xs" style={{ color: '#6B7280' }}>
                                        {exp.startDate} - {exp.endDate}
                                    </p>
                                </div>
                                <p className="text-xs italic mb-1" style={{ color: '#4B5563' }}>
                                    {exp.location}
                                </p>
                                <p style={{ color: '#374151' }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </section>
                )}

                {education?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b pb-1 mb-2" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>
                            Education
                        </h2>
                        {education.map((edu, index) => (
                            <div className="mb-3" key={index}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold" style={{ color: '#111827' }}>
                                        {edu.degree}, {edu.institution}
                                    </h3>
                                    <p className="text-xs" style={{ color: '#6B7280' }}>
                                        {edu.startDate} - {edu.endDate}
                                    </p>
                                </div>
                                <p className="text-xs italic mb-1" style={{ color: '#4B5563' }}>
                                    {edu.city}
                                </p>
                                <p style={{ color: '#374151' }}>
                                    {edu.description}
                                </p>
                            </div>
                        ))}
                    </section>
                )}

                {skills?.list?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b pb-1 mb-2" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.list.map((skill, index) => (
                                <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#E5E7EB', color: '#374151' }} key={index}>
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
                
                {projects?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b pb-1 mb-2" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>
                            Projects
                        </h2>
                        {projects.map((proj, index) => (
                            <div className="mb-3" key={index}>
                                <h3 className="font-semibold" style={{ color: '#111827' }}>
                                    {proj.name}
                                </h3>
                                {proj.link && (
                                    <p className="text-xs hover:underline" style={{ color: '#2563EB' }}>
                                        <a href={proj.link}>{proj.link}</a>
                                    </p>
                                )}
                                <p style={{ color: '#374151' }}>
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </section>
                )}

                {custom?.title && (
                    <section>
                        <h2 className="text-xl font-bold uppercase border-b pb-1 mb-2" style={{ borderColor: '#9CA3AF', color: '#1F2937' }}>
                            {custom.title}
                        </h2>
                        <div className="prose max-w-none" style={{ color: '#374151' }}>
                            <p>{custom.content}</p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default CompactTemplate;