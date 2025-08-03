import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const initialNewCvState = {
    _id: null,
    title: 'Untitled CV',
    templateName: 'modern',
    sections: [
        { type: 'personal', order: 1, data: { name: '', title: '', email: '', phone: '', linkedin: '', github: '', website: '', address: '' } },
        { type: 'summary', order: 2, data: { text: '' } },
        { type: 'experience', order: 3, data: [] },
        { type: 'education', order: 4, data: [] },
        { type: 'skills', order: 5, data: { list: [] } },
        { type: 'projects', order: 6, data: [] },
    ],
    userId: null,
};

const CvContext = createContext(null);

export const CvProvider = ({ children }) => {
    const [currentCv, setCurrentCv] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCv = useCallback((cvData) => {
        setCurrentCv(cvData || { ...initialNewCvState, _id: null });
        setError(null);
    }, []);

    const initializeNewCv = useCallback(() => {
        setCurrentCv({ ...initialNewCvState, _id: null });
        setError(null);
    }, []);

    const updateCvData = useCallback((sectionType, newData) => {
        setCurrentCv(prevCv => {
            if (!prevCv) return prevCv;

            if (sectionType === 'title' || sectionType === 'templateName') {
                return { ...prevCv, [sectionType]: newData };
            }

            return {
                ...prevCv,
                sections: prevCv.sections.map(section =>
                    section.type === sectionType
                        ? { ...section, data: newData }
                        : section
                )
            };
        });
    }, []);

    const updateCvTitle = useCallback((newTitle) => {
        setCurrentCv(prevCv => ({ ...prevCv, title: newTitle }));
    }, []);

    const updateTemplateName = useCallback((newTemplateName) => {
        setCurrentCv(prevCv => ({ ...prevCv, templateName: newTemplateName }));
    }, []);

    const addNewCvSection = useCallback((type, defaultData) => {
        setCurrentCv(prevCv => {
            if (!prevCv) return prevCv;
            const newSection = {
                type,
                order: prevCv.sections.length + 1,
                data: defaultData,
            };
            return {
                ...prevCv,
                sections: [...prevCv.sections, newSection].sort((a, b) => a.order - b.order),
            };
        });
    }, []);

    const removeCvSection = useCallback((type) => {
        setCurrentCv(prevCv => {
            if (!prevCv) return prevCv;
            const filteredSections = prevCv.sections.filter(s => s.type !== type);
            const reorderedSections = filteredSections.map((s, index) => ({ ...s, order: index + 1 }));
            return {
                ...prevCv,
                sections: reorderedSections,
            };
        });
    }, []);

    const reorderSections = useCallback((startIndex, endIndex) => {
        setCurrentCv(prevCv => {
            if (!prevCv) return prevCv;
            const result = Array.from(prevCv.sections);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            const reordered = result.map((section, index) => ({
                ...section,
                order: index + 1,
            }));
            return {
                ...prevCv,
                sections: reordered,
            };
        });
    }, []);

    const contextValue = useMemo(() => ({
        currentCv,
        loading,
        error,
        setLoading,
        setError,
        loadCv,
        initializeNewCv,
        updateCvData,
        updateCvTitle,
        updateTemplateName,
        addNewCvSection,
        removeCvSection,
        reorderSections,
    }), [
        currentCv, loading, error,
        loadCv, initializeNewCv, updateCvData,
        updateCvTitle, updateTemplateName,
        addNewCvSection, removeCvSection, reorderSections
    ]);

    return (
        <CvContext.Provider value={contextValue}>
            {children}
        </CvContext.Provider>
    );
};

export const useCv = () => {
    const context = useContext(CvContext);
    if (context === undefined) {
        throw new Error('useCv must be used within a CvProvider');
    }
    return context;
};