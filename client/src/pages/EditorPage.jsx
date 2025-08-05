import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCv } from '../context/CvContext';
import cvService from '../services/cvService';
import html2pdf from 'html2pdf.js';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Import all section components
import PersonalInfoSection from '../components/cv-editor/PersonalInfoSection';
import SummarySection from '../components/cv-editor/SummarySection';
import ExperienceSection from '../components/cv-editor/ExperienceSection';
import EducationSection from '../components/cv-editor/EducationSection';
import SkillsSection from '../components/cv-editor/SkillsSection';
import ProjectsSection from '../components/cv-editor/ProjectsSection';
import CustomSection from '../components/cv-editor/CustomSection';

// CV Template Components (for rendering the preview)
import ModernTemplate from '../components/cv-templates/ModernTemplate';
import ClassicTemplate from '../components/cv-templates/ClassicTemplate';
import CompactTemplate from '../components/cv-templates/CompactTemplate';
import ModernSidebarTemplate from '../components/cv-templates/ModernSidebarTemplate';

// Map template IDs to their respective React components
const templateMap = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    compact: CompactTemplate,
    'modern-sidebar': ModernSidebarTemplate,
};

function EditorPage() {
    // Get CV ID from URL params and initial template from search params
    const { id: cvId } = useParams();
    const [searchParams] = useSearchParams();
    const initialTemplate = searchParams.get('template') || 'modern';

    const navigate = useNavigate();
    const { user, getToken } = useAuth(); // Auth context for user and token
    const {
        currentCv,
        initializeNewCv,
        loadCv,
        loading,
        setLoading,
        setError, // Global error state from CvContext
        reorderSections,
        updateCvTitle,
        updateTemplateName,
        updateCvData,
    } = useCv(); // CV context for managing CV data

    const [localError, setLocalError] = useState(''); // Local error state for this component
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
    const cvPreviewRef = useRef(null); // Ref for the CV preview area for PDF export

    // Effect to handle CV loading or initialization
    useEffect(() => {
        // Redirect to auth page if user is not logged in
        if (!user) {
            navigate('/auth');
            return;
        }

        // Check if CV is already loaded or initialized to prevent unnecessary re-fetches
        const isCvAlreadyLoadedOrInitialized = currentCv && (currentCv._id === cvId || (!cvId && !currentCv._id));

        if (cvId) {
            // If a CV ID is present in the URL, try to fetch and load it
            if (!isCvAlreadyLoadedOrInitialized) {
                const fetchCv = async () => {
                    try {
                        setLoading(true); // Set global loading state
                        const token = getToken(); // Get auth token
                        const fetchedCv = await cvService.getCvById(cvId, token); // Fetch CV by ID
                        loadCv(fetchedCv); // Load fetched CV into context
                        setLocalError(''); // Clear any local errors
                        setLoading(false); // Clear global loading state
                    } catch (err) {
                        setError('Failed to load CV: ' + (err.response?.data?.message || err.message)); // Set global error
                        setLocalError('Failed to load CV. Please try again.'); // Set local error
                        setLoading(false); // Clear global loading state
                    }
                };
                fetchCv();
            }
        } else {
            // If no CV ID, initialize a new CV
            if (!isCvAlreadyLoadedOrInitialized) {
                initializeNewCv(); // Initialize new CV in context
                updateTemplateName(initialTemplate); // Set initial template from URL param
                setLocalError(''); // Clear any local errors
            }
        }
    }, [user, cvId, navigate, getToken, loadCv, initializeNewCv, setLoading, setError, currentCv, initialTemplate, updateTemplateName]);

    // Handles saving the current CV data
    const handleSaveCv = async () => {
        if (!currentCv) {
            setLocalError("No CV data to save.");
            return;
        }

        try {
            setLoading(true); // Set global loading state
            const token = getToken(); // Get auth token
            let savedCv;

            if (currentCv._id) {
                // If CV already exists, update it
                savedCv = await cvService.updateCv(currentCv._id, currentCv, token);
                setError(null); // Clear global error
                setLocalError(''); // Clear local error
                setShowSuccessMessage(true); // Show success message
                setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
            } else {
                // If it's a new CV, create it
                savedCv = await cvService.createCv(currentCv, token);
                setError(null); // Clear global error
                setLocalError(''); // Clear local error
                setShowSuccessMessage(true); // Show success message
                setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
                navigate(`/editor/${savedCv._id}`, { replace: true }); // Navigate to new CV's URL
            }
            loadCv(savedCv); // Load the saved CV into context (updates _id for new CVs)
            setLoading(false); // Clear global loading state
        } catch (err) {
            setError('Failed to save CV: ' + (err.response?.data?.message || err.message)); // Set global error
            setLocalError('Error saving CV: ' + (err.response?.data?.message || err.message)); // Set local error
            setLoading(false); // Clear global loading state
        }
    };

    // Handles exporting the CV to PDF
    const exportPdf = async () => { // Made async to await html2pdf operations
        if (cvPreviewRef.current) {
            console.log('Export PDF called', cvPreviewRef.current);

            // Save original styles of the preview container
            const originalMaxHeight = cvPreviewRef.current.style.maxHeight;
            const originalOverflowY = cvPreviewRef.current.style.overflowY;
            const originalPreviewBg = cvPreviewRef.current.style.backgroundColor; // Save original background color of the preview div

            // Store original body background style
            const originalBodyBg = document.body.style.backgroundColor;
            // Temporarily set body background to white to avoid potential issues with complex backgrounds/gradients
            document.body.style.backgroundColor = '#FFFFFF'; // Explicitly set to white

            // Temporarily remove max-height and overflow-y for full content capture by html2canvas
            cvPreviewRef.current.style.maxHeight = 'none';
            cvPreviewRef.current.style.overflowY = 'visible';
            // Also explicitly set the preview div's background to white during capture
            cvPreviewRef.current.style.backgroundColor = '#FFFFFF';


            const opt = {
                margin: 0,
                filename: `${currentCv?.title || 'resume'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    // Explicitly set background color for html2canvas to white
                    // This can help bypass issues with complex or unsupported backgrounds
                    backgroundColor: '#FFFFFF',
                },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak: { mode: 'avoid-all' } // Ensures content breaks cleanly across pages
            };

            try {
                // Generate and save the PDF
                await html2pdf().from(cvPreviewRef.current).set(opt).save();
                console.log('PDF generated and saved successfully.');
            } catch (error) {
                console.error('Error generating PDF:', error);
                setLocalError('Failed to generate PDF. Please try again.');
            } finally {
                // Restore original styles after PDF generation
                cvPreviewRef.current.style.maxHeight = originalMaxHeight;
                cvPreviewRef.current.style.overflowY = originalOverflowY;
                cvPreviewRef.current.style.backgroundColor = originalPreviewBg; // Restore original preview background color
                // Restore original body background
                document.body.style.backgroundColor = originalBodyBg;
            }
        } else {
            console.error('cvPreviewRef.current is null, cannot export PDF.');
            setLocalError('Could not generate PDF. Preview content not found.');
        }
    };

    // Callback for handling drag-and-drop section reordering
    const onDragEnd = useCallback((result) => {
        if (!result.destination || result.source.index === result.destination.index) return;
        reorderSections(result.source.index, result.destination.index);
    }, [reorderSections]);

    // Show loading state while CV data is being fetched or initialized
    if (loading || !currentCv) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading CV editor...</p>
                </div>
            </div>
        );
    }

    // Determine which template component to render based on currentCv.templateName
    const CurrentTemplateComponent = templateMap[currentCv.templateName];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            {/* Header for Editor Page */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {currentCv._id ? 'Edit Resume' : 'Create New Resume'}
                            </h1>
                            <p className="text-gray-600 mt-1">Design your professional resume with style</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSaveCv}
                                disabled={loading}
                                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Saving...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Save Resume
                                    </div>
                                )}
                            </button>
                            <button
                                onClick={exportPdf}
                                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Export PDF
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in-right">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        CV saved successfully!
                    </div>
                </div>
            )}

            {/* Error Message */}
            {localError && (
                <div className="max-w-7xl mx-auto px-6 pt-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-red-700">{localError}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Editor Panel */}
                    <div className="space-y-6">
                        {/* CV Settings Card */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Resume Settings
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume Title</label>
                                    <input
                                        type="text"
                                        value={currentCv.title}
                                        onChange={(e) => updateCvTitle(e.target.value)}
                                        placeholder="My Professional Resume"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Template Style</label>
                                    <div className="relative">
                                        <select
                                            value={currentCv.templateName}
                                            onChange={(e) => updateTemplateName(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 appearance-none"
                                        >
                                            {Object.keys(templateMap).map(templateKey => (
                                                <option key={templateKey} value={templateKey}>
                                                    {templateKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Template
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Controls */}
                        <SectionControls />

                        {/* Sections Editor */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                Edit Sections
                                <span className="text-sm font-normal text-gray-500 ml-2">(Drag to reorder)</span>
                            </h3>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="cv-sections">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                            {currentCv.sections
                                                .sort((a, b) => a.order - b.order)
                                                .map((section, index) => {
                                                    const sectionData = currentCv.sections.find(s => s.type === section.type)?.data;

                                                    return (
                                                        <Draggable key={section.type + (section.id || '')} draggableId={section.type + (section.id || '')} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 overflow-hidden transition-all duration-200 ${
                                                                        snapshot.isDragging ? 'shadow-2xl scale-105 rotate-2' : 'hover:shadow-xl'
                                                                    }`}
                                                                >
                                                                    <div
                                                                        className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white cursor-grab active:cursor-grabbing border-b border-gray-100"
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                                                                            </svg>
                                                                            <span className="font-semibold text-gray-800">
                                                                                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                                                                                {section.type === 'custom' && sectionData?.title && ` - ${sectionData.title}`}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1 text-gray-400">
                                                                            <div className="w-1 h-1 bg-current rounded-full"></div>
                                                                            <div className="w-1 h-1 bg-current rounded-full"></div>
                                                                            <div className="w-1 h-1 bg-current rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-6">
                                                                        {section.type === 'personal' && <PersonalInfoSection sectionData={sectionData} updateCvData={updateCvData} />}
                                                                        {section.type === 'summary' && <SummarySection sectionData={sectionData} updateCvData={updateCvData} />}
                                                                        {section.type === 'experience' && <ExperienceSection sectionData={sectionData} updateCvData={updateCvData} />}
                                                                        {section.type === 'education' && <EducationSection sectionData={sectionData} updateCvData={updateCvData} />}
                                                                        {section.type === 'skills' && <SkillsSection sectionData={sectionData} updateCvData={updateCvData} />}
                                                                        {section.type === 'projects' && <ProjectsSection sectionData={sectionData} updateCvData={updateCvData} />}
                                                                        {section.type === 'custom' && <CustomSection sectionData={sectionData} updateCvData={updateCvData} sectionId={section.id} />}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="xl:sticky xl:top-24 xl:h-fit">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Live Preview
                            </h3>
                            <div ref={cvPreviewRef} className="bg-white rounded-xl shadow-lg overflow-hidden max-h-[800px] overflow-y-auto">
                                {CurrentTemplateComponent ? (
                                    <CurrentTemplateComponent cvData={currentCv} />
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p>Select a template to see your resume preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// SectionControls component (remains the same as provided previously)
const SectionControls = () => {
    const { currentCv, addNewCvSection, removeCvSection } = useCv();
    const availableSections = [
        {
            type: 'personal',
            label: 'Personal Info',
            icon: '👤',
            defaultData: { name: '', title: '', email: '', phone: '', linkedin: '', github: '', website: '', address: '' }
        },
        {
            type: 'summary',
            label: 'Summary',
            icon: '�',
            defaultData: { text: '' }
        },
        {
            type: 'experience',
            label: 'Experience',
            icon: '💼',
            defaultData: []
        },
        {
            type: 'education',
            label: 'Education',
            icon: '🎓',
            defaultData: []
        },
        {
            type: 'skills',
            label: 'Skills',
            icon: '⚡',
            defaultData: { list: [] }
        },
        {
            type: 'projects',
            label: 'Projects',
            icon: '🚀',
            defaultData: []
        },
        {
            type: 'custom',
            label: 'Custom Section',
            icon: '➕',
            defaultData: { title: 'New Custom Section', content: '' }
        },
    ];

    const currentSectionTypes = currentCv?.sections.map(s => s.type) || [];

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Manage Sections
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableSections.map(sec => (
                    <React.Fragment key={sec.type}>
                        {!currentSectionTypes.includes(sec.type) ? (
                            <button
                                onClick={() => addNewCvSection(sec.type, sec.defaultData)}
                                className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 rounded-xl hover:from-indigo-100 hover:to-purple-100 hover:border-indigo-300 transition-all duration-200 transform hover:scale-105"
                            >
                                <span className="text-lg">{sec.icon}</span>
                                <span className="font-medium">Add {sec.label}</span>
                            </button>
                        ) : (
                            (sec.type !== 'personal' && sec.type !== 'summary') && (
                                <button
                                    onClick={() => removeCvSection(sec.type)}
                                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 rounded-xl hover:from-red-100 hover:to-pink-100 hover:border-red-300 transition-all duration-200 transform hover:scale-105"
                                >
                                    <span className="text-lg">🗑️</span>
                                    <span className="font-medium">Remove {sec.label}</span>
                                </button>
                            )
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default EditorPage;
