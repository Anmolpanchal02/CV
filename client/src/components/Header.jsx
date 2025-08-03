import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, PlusCircle, LogIn, LogOut, User, Menu, X, ChevronDown } from 'lucide-react';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    // This function handles the logout process and closes all menus
    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    };

    // This function closes the mobile menu
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // This function closes both the mobile and user menus
    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    };

    // This function handles the toggle for the desktop user menu
    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev);
    };

    return (
        <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl relative z-50">
            {/* Desktop and Tablet Navigation */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo and App Name */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105"
                        onClick={closeAllMenus}
                    >
                        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                        <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            CV Builder
                        </span>
                    </Link>

                    {/* Desktop and Tablet Links */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-white transition-all duration-300 text-lg font-medium relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-300 hover:text-white transition-all duration-300 text-lg font-medium relative group"
                                >
                                    My Resumes
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                                <Link
                                    to="/editor"
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Create CV
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 focus:outline-none"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-medium max-w-32 truncate">{user.name}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isUserMenuOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm text-gray-600">Signed in as</p>
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/auth"
                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <LogIn className="w-5 h-5" />
                                Login / Register
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="relative lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>

                        {/* Mobile Dropdown Menu */}
                        {isMobileMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                <nav className="flex flex-col">
                                    <Link
                                        to="/"
                                        onClick={closeMobileMenu}
                                        className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                                    >
                                        Home
                                    </Link>
                                    
                                    {user ? (
                                        <>
                                            <Link
                                                to="/dashboard"
                                                onClick={closeMobileMenu}
                                                className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
                                            >
                                                My Resumes
                                            </Link>
                                            <Link
                                                to="/editor"
                                                onClick={closeMobileMenu}
                                                className="mx-2 my-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                                            >
                                                <PlusCircle className="w-5 h-5" />
                                                Create CV
                                            </Link>
                                            <div className="border-t border-gray-200 mt-2 pt-2">
                                                <div className="px-4 py-2 text-sm text-gray-600">
                                                    Signed in as
                                                </div>
                                                <div className="px-4 py-1 text-sm font-semibold text-gray-900 truncate">
                                                    {user.name}
                                                </div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2 font-medium"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            to="/auth"
                                            onClick={closeMobileMenu}
                                            className="mx-2 my-2 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                                        >
                                            <LogIn className="w-5 h-5" />
                                            Login / Register
                                        </Link>
                                    )}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop user menu backdrop to close on click outside */}
            {isUserMenuOpen && (
                <div
                    className="hidden lg:block fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                ></div>
            )}

            {/* Mobile menu backdrop to close on click outside */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40"
                    onClick={closeMobileMenu}
                ></div>
            )}
        </header>
    );
}

export default Header;