
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Edit3, Star, Users, Award, ChevronRight, Play, Zap, Shield, Clock, CheckCircle, ArrowRight, Sparkles, Target, TrendingUp, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Your existing templates data with real images
const cvTemplates = [
    {
        id: 'modern',
        name: 'Modern Professional',
        description: 'Clean design with modern typography and subtle colors',
        category: 'Professional',
        rating: 4.8,
        downloads: '12.5k',
        preview: 'https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/8220/persistent-resource/shanghai-resume-templates.jpg?v=1732630221%202x',
        features: ['ATS Friendly', 'Modern Design', 'Multiple Colors'],
        isPremium: false
    },
    {
        id: 'classic',
        name: 'Classic Executive',
        description: 'Traditional layout perfect for corporate positions',
        category: 'Corporate',
        rating: 4.9,
        downloads: '18.2k',
        preview: 'https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg?v=1656506913',
        features: ['Corporate Style', 'Professional', 'Clean Layout'],
        isPremium: true
    },
    {
        id: 'creative',
        name: 'Creative Portfolio',
        description: 'Eye-catching design for creative professionals',
        category: 'Creative',
        rating: 4.7,
        downloads: '8.9k',
        preview: 'https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/503/persistent-resource/amsterdam-resume-templates.jpg?v=1650527806',
        features: ['Creative Design', 'Portfolio Section', 'Visual Appeal'],
        isPremium: true
    },
    {
        id: 'minimal',
        name: 'Minimal Clean',
        description: 'Simple and elegant design focusing on content',
        category: 'Minimal',
        rating: 4.6,
        downloads: '15.7k',
        preview: 'https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/503/persistent-resource/amsterdam-resume-templates.jpg?v=1650527806',
        features: ['Minimalist', 'Easy to Read', 'Space Efficient'],
        isPremium: false
    },
    // Your new templates
    {
        id: 'modern-sidebar',
        name: 'Modern Sidebar',
        description: 'A two-column layout with a prominent sidebar for personal info.',
        category: 'Professional',
        rating: 4.5,
        downloads: '6.4k',
        preview: 'https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649',
        features: ['2-Column Layout', 'Clean Design', 'ATS Friendly'],
        isPremium: false
    },
    {
        id: 'compact',
        name: 'Compact Minimal',
        description: 'A space-efficient design to fit a lot of content on one page.',
        category: 'Minimal',
        rating: 4.7,
        downloads: '9.1k',
        preview: 'https://s3.resume.io/cdn-cgi/image/width=380,dpr=2,format=auto/uploads/local_template_image/image/7496/persistent-resource/brussels-resume-templates.jpg?v=1698831369',
        features: ['Space Efficient', 'Minimalist', 'Dense Layout'],
        isPremium: true
    }
];

// Enhanced features with your original ones
const features = [
    {
        icon: <Edit3 className="w-8 h-8" />,
        title: 'Easy Drag & Drop Editor',
        description: 'Intuitive interface with real-time preview and instant updates'
    },
    {
        icon: <Download className="w-8 h-8" />,
        title: 'Multiple Export Formats',
        description: 'Download as PDF, Word, PNG or share with a custom link'
    },
    {
        icon: <Award className="w-8 h-8" />,
        title: 'ATS Optimized Templates',
        description: 'Pass applicant tracking systems with our optimized designs'
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: 'HR Approved Designs',
        description: 'Created by professionals, tested by recruiters worldwide'
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: 'AI-Powered Suggestions',
        description: 'Get smart recommendations for content and formatting'
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: 'Privacy Protected',
        description: 'Your data is encrypted and never shared with third parties'
    },
    {
        icon: <Clock className="w-8 h-8" />,
        title: 'Build in Minutes',
        description: 'Create professional CVs in under 10 minutes'
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: 'Multi-Language Support',
        description: 'Create CVs in 15+ languages with localized formatting'
    }
];

// Enhanced stats with your data
const stats = [
    { number: '50,000+', label: 'CVs Created', icon: <FileText className="w-6 h-6" /> },
    { number: '95%', label: 'Success Rate', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '1M+', label: 'Downloads', icon: <Download className="w-6 h-6" /> },
    { number: '4.8/5', label: 'User Rating', icon: <Star className="w-6 h-6" /> }
];

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Marketing Manager',
        company: 'Google',
        image: 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=SJ',
        quote: 'Got 3 interview calls within a week of using this CV builder!'
    },
    {
        name: 'Michael Chen',
        role: 'Software Engineer',
        company: 'Microsoft',
        image: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=MC',
        quote: 'The ATS optimization really works. Landed my dream job!'
    },
    {
        name: 'Emily Davis',
        role: 'Product Designer',
        company: 'Adobe',
        image: 'https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=ED',
        quote: 'Beautiful templates and so easy to customize. Highly recommended!'
    }
];

function HomePage() {
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const categories = ['All', 'Professional', 'Corporate', 'Creative', 'Minimal'];

    const filteredTemplates = selectedCategory === 'All' 
        ? cvTemplates 
        : cvTemplates.filter(template => template.category === selectedCategory);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Enhanced Hero Section - Recreating the image design */}
            <div className="relative overflow-hidden">
                {/* Background with geometric shapes */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-teal-300 to-green-300">
                    {/* Geometric shapes */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-60"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-orange-400 transform rotate-45 opacity-70"></div>
                    <div className="absolute bottom-20 left-32 w-24 h-24 bg-pink-400 rounded-full opacity-50"></div>
                    <div className="absolute top-40 left-1/3 w-12 h-12 bg-purple-400 transform rotate-12 opacity-60"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Text content */}
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
                                Build Your Professional{' '}
                                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    CV
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl">
                                Create professional resumes that land interviews. Choose from our expert-designed templates and build your career-defining CV in minutes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link 
                                    to="/editor" 
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    GET STARTED
                                </Link>
                                <a 
                                    href="#templates-section"
                                    className="border-2 border-gray-700 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-700 hover:text-white transition-all"
                                >
                                    View Templates
                                </a>
                            </div>
                        </div>

                        {/* Right side - Illustration recreation */}
                        <div className="relative">
                            {/* Main resume mockup */}
                            <div className="relative z-10 bg-white rounded-xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="h-80 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-4">
                                    {/* Resume header */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">👩</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-3 bg-gray-300 rounded mb-2"></div>
                                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                    {/* Resume content lines */}
                                    <div className="space-y-2">
                                        <div className="h-2 bg-yellow-300 rounded"></div>
                                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                                        <div className="h-2 bg-gray-200 rounded w-4/6"></div>
                                        <div className="h-2 bg-orange-300 rounded w-3/4"></div>
                                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                    {/* Skills section */}
                                    <div className="mt-6 flex gap-2">
                                        <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                                        <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
                                        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Computer mockup in background */}
                            <div className="absolute -left-20 top-10 w-64 h-48 bg-gray-800 rounded-lg shadow-xl transform -rotate-12 opacity-80">
                                <div className="bg-blue-500 h-32 rounded-t-lg p-4">
                                    <div className="flex gap-2 mb-4">
                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-white/30 rounded w-4/5"></div>
                                        <div className="h-2 bg-white/30 rounded w-3/5"></div>
                                        <div className="h-2 bg-white/30 rounded w-5/6"></div>
                                    </div>
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="h-2 bg-gray-600 rounded"></div>
                                    <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                                </div>
                            </div>

                            {/* Dashboard mockup */}
                            <div className="absolute -right-10 -top-5 w-48 h-32 bg-white rounded-lg shadow-xl transform rotate-12 p-3">
                                <div className="grid grid-cols-3 gap-2 h-full">
                                    <div className="bg-green-400 rounded flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="bg-purple-400 rounded flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="bg-orange-400 rounded flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="col-span-3 bg-gray-100 rounded p-2 space-y-1">
                                        <div className="h-1 bg-gray-400 rounded"></div>
                                        <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                                        <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute top-20 right-20 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <Star className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute bottom-10 left-10 w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Stats Section */}
            <div className="bg-white py-16 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all">
                                <div className="flex justify-center mb-3 text-blue-600 group-hover:text-blue-700">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Features Section */}
            <div className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose Our <span className="text-blue-600">CV Builder</span>?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Professional tools, expert designs, and AI-powered features to help you stand out from the competition
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 group">
                                <div className="text-blue-600 mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-all">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Templates Section */}
            <div id="templates-section" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Choose Your Perfect <span className="text-purple-600">Template</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Professional designs crafted by experts, tested by recruiters, loved by job seekers worldwide
                        </p>
                        
                        {/* Enhanced Category Filter */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Template Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            <div key={template.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-3">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={template.preview} 
                                        alt={template.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {template.isPremium && (
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            PREMIUM
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-semibold">{template.rating}</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                        {template.downloads} downloads
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{template.name}</h3>
                                    <p className="text-gray-600 mb-4 text-sm">{template.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {template.features.map((feature, index) => (
                                            <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <Link 
                                            to={user ? `/editor?template=${template.id}` : '/auth'}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            Use Template
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <button className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all">
                                            <FileText className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
                    <p className="text-xl mb-12 text-blue-100">Join thousands of successful professionals</p>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <img 
                                src={testimonials[currentTestimonial].image} 
                                alt={testimonials[currentTestimonial].name}
                                className="w-16 h-16 rounded-full border-4 border-white/30"
                            />
                            <div className="text-left">
                                <h4 className="font-semibold text-lg">{testimonials[currentTestimonial].name}</h4>
                                <p className="text-blue-100">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</p>
                            </div>
                        </div>
                        <p className="text-xl italic mb-6">"{testimonials[currentTestimonial].quote}"</p>
                        <div className="flex justify-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        index === currentTestimonial ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-20">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
                    <p className="text-xl mb-8 text-yellow-100">
                        Join thousands of professionals who've successfully built their careers with our CV builder
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to={user ? '/editor' : '/auth'}
                            className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Start Building for Free
                        </Link>
                        <Link 
                            to="#"
                            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all"
                        >
                            View Success Stories
                        </Link>
                    </div>
                    <p className="text-sm mt-4 text-yellow-100">No credit card required • 100% Free templates</p>
                </div>
            </div>

            {/* Enhanced Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold">CV Builder Pro</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Empowering careers worldwide with professional CV building tools. 
                                Join millions who've transformed their job search experience.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                                    <span className="text-sm">f</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                                    <span className="text-sm">t</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                                    <span className="text-sm">in</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4 text-lg">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 CV Builder Pro. All rights reserved. Building careers, one CV at a time.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;