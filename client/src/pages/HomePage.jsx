
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
        image: 'data:image/jpeg;base64,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',
        quote: 'Got 3 interview calls within a week of using this CV builder!'
    },
    {
        name: 'Michael Chen',
        role: 'Software Engineer',
        company: 'Microsoft',
        image: 'data:image/jpeg;base64,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',
        quote: 'The ATS optimization really works. Landed my dream job!'
    },
    {
        name: 'Emily Davis',
        role: 'Product Designer',
        company: 'Adobe',
        image: 'data:image/jpeg;base64,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nBkCk+anzpPc0/QfYPiLeN52HdLe+hjlsncqgXekx7w4XKn7a68R1FwJwCXsBjHpOtWkxV0N1Ycj+YtpbmDJi2md8cWfTcTFbr7ZXF4anXAsWFmX7rjRh5X4eBEys1cs9ERECYiIAyJJkQEREDUO1DaTUsEyJfNWOTTknGofIju/6pw4ifR+1tkJXtn5A29eP4CaDvN2faF6fylLQ2x3iI05YvCTPditj1aWjKdOk8FXSU032pXUyefpFMaRU69DA2vd2rejb7rEe/eH4/KZSazu3XtUKcnHzW5HyJmzThy11aXo4bbpBERMmhERASzjK+RGfoNPPkPe0vTB7zYnRaY594+Q4D319JeleVohXJbjWZa3VPCW5U51lNp6Dy15DpJijTJ5GeqlgXPKEvKTJprwmWpbDZuRmx7J3ULEXEnSJtEMn2P45kqVKDfVqDOv9a6N7rb/AMJ1SapsDdwUmVwLFT/Y/KbXNIc153OyIiSomIiAMiTIgIiICIiBitobAo1eK5T4cPaantXs/DXKhW8tD7GdBiRpaLTDiuO3GZeRWYfEbrVRPoIieergKbcUX2t+EjivGWXzymyK6EELqpBHpNspUmZQwU6j9idOq7AonkRLS7uoBYH5THLh5ujD5XD25x8Buhj4DdDOiNu8OolP/p7ymH40uj82rnow7dDKhhG6ToA3f8pcXYI8JP40n5tXPGwjAEngBNar7Gq1HZ24k+3Qegnaam76kWJ+UlN3KQ4kn2E2xYYr258vlc+nF6O6zc7zJYbdXwnXqexaI+zfzJ/KeqnhEXgij0E24uecrl2D3VJ4IT5AmZzB7ntzUDztN7iTpWby17Cbrov1iPQfmZmMPgUTgPeemJKszJERCCIiBMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED/2Q==',
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

            {/* Enhanced CTA Section
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
            </div> */}

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