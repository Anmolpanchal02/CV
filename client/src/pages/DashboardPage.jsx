import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, Edit3, Trash2, Plus, Calendar, User, RefreshCw, AlertCircle } from 'lucide-react';

import cvService from '../services/cvService';
import { useCv } from '../context/CvContext';

function DashboardPage() {
    const { user, getToken, loading: authLoading } = useAuth();
    const { loadCv } = useCv();
    const navigate = useNavigate();
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/auth'); // Redirect to login if not authenticated
        } else if (user) {
            fetchMyCvs();
        }
    }, [user, authLoading, navigate]);

    const fetchMyCvs = async () => {
        try {
            setLoading(true);
            setError(''); // Clear any previous errors
            const token = getToken();
            const data = await cvService.getMyCvs(token);
            setCvs(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch CVs: ' + (err.response?.data?.message || err.message));
            setLoading(false);
        }
    };

    const handleEditCv = (cvId) => {
        navigate(`/editor/${cvId}`);
    };

    const handleDeleteCv = async (cvId) => {
        if (window.confirm('Are you sure you want to delete this CV?')) {
            try {
                setLoading(true);
                const token = getToken();
                await cvService.deleteCv(cvId, token);
                await fetchMyCvs(); // Refresh list
                setLoading(false);
            } catch (err) {
                setError('Failed to delete CV: ' + (err.response?.data?.message || err.message));
                setLoading(false);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Loading state
    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your CVs...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4">
                    <div className="text-red-500 text-center">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                        <p className="text-lg font-semibold mb-4">{error}</p>
                        <button 
                            onClick={fetchMyCvs}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome back, {user?.name || user?.email || 'User'}!
                                </h1>
                                <p className="text-gray-600">Manage your professional CVs</p>
                            </div>
                        </div>
                        <Link
                            to="/editor"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Create New CV
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <FileText className="h-8 w-8 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">My CVs</h2>
                                    <p className="text-gray-600">{cvs.length} CV{cvs.length !== 1 ? 's' : ''} created</p>
                                </div>
                            </div>
                            <button 
                                onClick={fetchMyCvs}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Refresh CVs"
                                disabled={loading}
                            >
                                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* CVs Grid */}
                {cvs.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200">
                            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No CVs yet</h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Get started by creating your first professional CV. It only takes a few minutes!
                            </p>
                            <Link
                                to="/editor"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Create Your First CV
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cvs.map((cv) => (
                            <div key={cv._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                <div className="p-6">
                                    {/* CV Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <FileText className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate" title={cv.title}>
                                                    {cv.title || 'Untitled CV'}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CV Meta Info */}
                                    <div className="space-y-2 mb-6">
                                        {cv.createdAt && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                                <span>Created {formatDate(cv.createdAt)}</span>
                                            </div>
                                        )}
                                        {cv.updatedAt && cv.updatedAt !== cv.createdAt && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Edit3 className="h-4 w-4 mr-2 flex-shrink-0" />
                                                <span>Updated {formatDate(cv.updatedAt)}</span>
                                            </div>
                                        )}
                                        {!cv.createdAt && !cv.updatedAt && (
                                            <div className="flex items-center text-sm text-gray-400">
                                                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                                <span>Date unknown</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleEditCv(cv._id)}
                                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Edit3 className="h-4 w-4 mr-2" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCv(cv._id)}
                                            className="inline-flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                                            title="Delete CV"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                
            </div>
        </div>
    );
}

export default DashboardPage;