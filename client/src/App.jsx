import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Agents from './components/Agents';
import CSVUpload from './components/CSVUpload';
import "./App.css"
import TaskList from './components/TaskList';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/upload" element={<CSVUpload />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
