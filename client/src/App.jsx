import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header'; // <-- New import here

function App() {
    return (
        <>
            <Header /> {/* <-- Use the new Header component here */}
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/editor" element={<EditorPage />} />
                    <Route path="/editor/:id" element={<EditorPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;