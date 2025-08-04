// services/pdfService.js
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

class PdfService {
    /**
     * Extract text content from PDF file
     * @param {File} file - PDF file object
     * @returns {Promise<string>} - Extracted text content
     */
    async extractTextFromPdf(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            let fullText = '';
            
            // Extract text from all pages
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }
            
            return fullText;
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            throw new Error('Failed to extract text from PDF');
        }
    }

    /**
     * Parse extracted text and structure it for CV data
     * @param {string} text - Raw extracted text
     * @returns {Object} - Structured CV data
     */
    parseResumeText(text) {
        return {
            personal: this.extractPersonalInfo(text),
            summary: this.extractSummary(text),
            experience: this.extractExperience(text),
            education: this.extractEducation(text),
            skills: this.extractSkills(text),
            projects: this.extractProjects(text)
        };
    }

    /**
     * Extract personal information
     */
    extractPersonalInfo(text) {
        const personalInfo = { 
            name: '', 
            title: '', 
            email: '', 
            phone: '', 
            linkedin: '', 
            github: '', 
            website: '', 
            address: '' 
        };
        
        // Extract email
        const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
        if (emailMatch) personalInfo.email = emailMatch[0];
        
        // Extract phone - multiple formats
        const phonePatterns = [
            /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
            /(?:\+?\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/,
            /(?:\+?\d{1,3}[-.\s]?)?\d{10}/
        ];
        
        for (const pattern of phonePatterns) {
            const phoneMatch = text.match(pattern);
            if (phoneMatch) {
                personalInfo.phone = phoneMatch[0];
                break;
            }
        }
        
        // Extract LinkedIn
        const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin\.com\/profile\/view\?id=)([a-zA-Z0-9-]+)/i);
        if (linkedinMatch) personalInfo.linkedin = `linkedin.com/in/${linkedinMatch[1]}`;
        
        // Extract GitHub
        const githubMatch = text.match(/github\.com\/([a-zA-Z0-9-]+)/i);
        if (githubMatch) personalInfo.github = `github.com/${githubMatch[1]}`;
        
        // Extract website (exclude social media)
        const websitePatterns = [
            /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9]*\.(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)(?:\/[^\s]*)?/g
        ];
        
        const websites = text.match(websitePatterns[0]);
        if (websites) {
            const filteredWebsite = websites.find(site => 
                !site.includes('linkedin') && 
                !site.includes('github') && 
                !site.includes('twitter') &&
                !site.includes('facebook') &&
                !site.includes('instagram')
            );
            if (filteredWebsite) personalInfo.website = filteredWebsite;
        }
        
        // Extract name (usually the first line or largest text)
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
            const firstLine = lines[0].trim();
            if (!firstLine.includes('@') && !firstLine.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)) {
                personalInfo.name = firstLine;
            }
        }
        
        // Extract title/position (usually after name)
        if (lines.length > 1) {
            const secondLine = lines[1].trim();
            if (!secondLine.includes('@') && 
                !secondLine.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/) &&
                !secondLine.includes('linkedin') &&
                !secondLine.includes('github')) {
                personalInfo.title = secondLine;
            }
        }
        
        return personalInfo;
    }

    /**
     * Extract professional summary
     */
    extractSummary(text) {
        const summaryKeywords = [
            'SUMMARY', 'PROFILE', 'OBJECTIVE', 'ABOUT', 'OVERVIEW',
            'PROFESSIONAL SUMMARY', 'CAREER OBJECTIVE', 'EXECUTIVE SUMMARY'
        ];
        
        const endKeywords = [
            'EXPERIENCE', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE',
            'EDUCATION', 'SKILLS', 'PROJECTS', 'EMPLOYMENT HISTORY'
        ];
        
        for (const keyword of summaryKeywords) {
            const regex = new RegExp(`${keyword}[\\s\\n:]+([\\s\\S]*?)(?=${endKeywords.join('|')}|$)`, 'i');
            const match = text.match(regex);
            
            if (match && match[1]) {
                const summaryText = match[1].trim();
                if (summaryText.length > 20) { // Ensure it's substantial content
                    return { text: summaryText };
                }
            }
        }
        
        return { text: '' };
    }

    /**
     * Extract work experience
     */
    extractExperience(text) {
        const experiences = [];
        const experienceKeywords = [
            'EXPERIENCE', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE', 
            'EMPLOYMENT HISTORY', 'CAREER HISTORY', 'WORK HISTORY'
        ];
        
        const endKeywords = [
            'EDUCATION', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS', 'AWARDS'
        ];
        
        for (const keyword of experienceKeywords) {
            const regex = new RegExp(`${keyword}[\\s\\n:]+([\\s\\S]*?)(?=${endKeywords.join('|')}|$)`, 'i');
            const match = text.match(regex);
            
            if (match && match[1]) {
                const experienceText = match[1].trim();
                const jobEntries = this.parseExperienceEntries(experienceText);
                experiences.push(...jobEntries);
                break;
            }
        }
        
        return experiences;
    }

    /**
     * Parse individual experience entries
     */
    parseExperienceEntries(text) {
        const experiences = [];
        
        // Split by double newlines or clear separators
        const entries = text.split(/\n\s*\n/).filter(entry => entry.trim());
        
        for (const entry of entries) {
            const lines = entry.trim().split('\n').filter(line => line.trim());
            
            if (lines.length >= 2) {
                const experience = {
                    jobTitle: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                };
                
                // First line is usually job title
                experience.jobTitle = lines[0].trim();
                
                // Second line is usually company
                experience.company = lines[1].trim();
                
                // Look for dates in the entry
                const datePattern = /(\d{4})\s*[-–—]\s*(\d{4}|present|current)/gi;
                const dateMatch = entry.match(datePattern);
                
                if (dateMatch) {
                    const dates = dateMatch[0].split(/[-–—]/);
                    experience.startDate = dates[0].trim();
                    experience.endDate = dates[1] && (dates[1].toLowerCase().includes('present') || dates[1].toLowerCase().includes('current')) 
                        ? '' 
                        : dates[1]?.trim() || '';
                }
                
                // Remaining lines are description
                if (lines.length > 2) {
                    experience.description = lines.slice(2).join('\n').trim();
                }
                
                if (experience.jobTitle && experience.company) {
                    experiences.push(experience);
                }
            }
        }
        
        return experiences;
    }

    /**
     * Extract education information
     */
    extractEducation(text) {
        const education = [];
        const educationKeywords = [
            'EDUCATION', 'ACADEMIC BACKGROUND', 'ACADEMIC QUALIFICATIONS',
            'EDUCATIONAL BACKGROUND', 'QUALIFICATIONS'
        ];
        
        const endKeywords = [
            'EXPERIENCE', 'WORK EXPERIENCE', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS'
        ];
        
        for (const keyword of educationKeywords) {
            const regex = new RegExp(`${keyword}[\\s\\n:]+([\\s\\S]*?)(?=${endKeywords.join('|')}|$)`, 'i');
            const match = text.match(regex);
            
            if (match && match[1]) {
                const educationText = match[1].trim();
                const eduEntries = this.parseEducationEntries(educationText);
                education.push(...eduEntries);
                break;
            }
        }
        
        return education;
    }

    /**
     * Parse individual education entries
     */
    parseEducationEntries(text) {
        const education = [];
        const entries = text.split(/\n\s*\n/).filter(entry => entry.trim());
        
        for (const entry of entries) {
            const lines = entry.trim().split('\n').filter(line => line.trim());
            
            if (lines.length >= 1) {
                const edu = {
                    degree: '',
                    institution: '',
                    location: '',
                    graduationDate: '',
                    gpa: ''
                };
                
                // First line is usually degree
                edu.degree = lines[0].trim();
                
                // Second line is usually institution
                if (lines[1]) {
                    edu.institution = lines[1].trim();
                }
                
                // Look for graduation year
                const yearMatch = entry.match(/(\d{4})/);
                if (yearMatch) {
                    edu.graduationDate = yearMatch[1];
                }
                
                // Look for GPA
                const gpaMatch = entry.match(/GPA[:\s]*(\d+\.?\d*)/i);
                if (gpaMatch) {
                    edu.gpa = gpaMatch[1];
                }
                
                if (edu.degree) {
                    education.push(edu);
                }
            }
        }
        
        return education;
    }

    /**
     * Extract skills
     */
    extractSkills(text) {
        const skills = [];
        const skillsKeywords = [
            'SKILLS', 'TECHNICAL SKILLS', 'COMPETENCIES', 'TECHNOLOGIES',
            'PROGRAMMING LANGUAGES', 'TOOLS', 'SOFTWARE', 'TECHNICAL COMPETENCIES'
        ];
        
        const endKeywords = [
            'EXPERIENCE', 'EDUCATION', 'PROJECTS', 'CERTIFICATIONS', 'AWARDS'
        ];
        
        for (const keyword of skillsKeywords) {
            const regex = new RegExp(`${keyword}[\\s\\n:]+([\\s\\S]*?)(?=${endKeywords.join('|')}|$)`, 'i');
            const match = text.match(regex);
            
            if (match && match[1]) {
                const skillsText = match[1].trim();
                const extractedSkills = this.parseSkillsList(skillsText);
                skills.push(...extractedSkills);
                break;
            }
        }
        
        return { list: [...new Set(skills)] }; // Remove duplicates
    }

    /**
     * Parse skills list from text
     */
    parseSkillsList(text) {
        const skills = [];
        const lines = text.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
            const cleanLine = line.trim().replace(/^[-•·*]/g, ''); // Remove bullet points
            
            if (cleanLine && cleanLine.length > 1) {
                // Split by common delimiters
                const lineSkills = cleanLine.split(/[,;|]/);
                
                for (const skill of lineSkills) {
                    const cleanSkill = skill.trim();
                    if (cleanSkill && cleanSkill.length > 1 && !skills.includes(cleanSkill)) {
                        skills.push(cleanSkill);
                    }
                }
            }
        }
        
        return skills;
    }

    /**
     * Extract projects
     */
    extractProjects(text) {
        const projects = [];
        const projectKeywords = [
            'PROJECTS', 'PROJECT EXPERIENCE', 'PERSONAL PROJECTS',
            'NOTABLE PROJECTS', 'KEY PROJECTS'
        ];
        
        const endKeywords = [
            'EXPERIENCE', 'EDUCATION', 'SKILLS', 'CERTIFICATIONS', 'AWARDS'
        ];
        
        for (const keyword of projectKeywords) {
            const regex = new RegExp(`${keyword}[\\s\\n:]+([\\s\\S]*?)(?=${endKeywords.join('|')}|$)`, 'i');
            const match = text.match(regex);
            
            if (match && match[1]) {
                const projectsText = match[1].trim();
                const projectEntries = this.parseProjectEntries(projectsText);
                projects.push(...projectEntries);
                break;
            }
        }
        
        return projects;
    }

    /**
     * Parse individual project entries
     */
    parseProjectEntries(text) {
        const projects = [];
        const entries = text.split(/\n\s*\n/).filter(entry => entry.trim());
        
        for (const entry of entries) {
            const lines = entry.trim().split('\n').filter(line => line.trim());
            
            if (lines.length >= 1) {
                const project = {
                    title: '',
                    description: '',
                    technologies: '',
                    link: '',
                    duration: ''
                };
                
                // First line is usually project title
                project.title = lines[0].trim();
                
                // Look for links
                const linkMatch = entry.match(/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9][-a-zA-Z0-9]*[a-zA-Z0-9]*\.(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)(?:\/[^\s]*)?/);
                if (linkMatch) {
                    project.link = linkMatch[0];
                }
                
                // Look for technologies (usually in parentheses or after keywords)
                const techMatch = entry.match(/(?:Technologies|Tech Stack|Built with)[:\s]*([^\n]+)/i);
                if (techMatch) {
                    project.technologies = techMatch[1].trim();
                }
                
                // Remaining content as description
                const descriptionLines = lines.slice(1).filter(line => 
                    !line.includes('http') && 
                    !line.toLowerCase().includes('technologies')
                );
                project.description = descriptionLines.join('\n').trim();
                
                if (project.title) {
                    projects.push(project);
                }
            }
        }
        
        return projects;
    }
}

export default new PdfService();