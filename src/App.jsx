import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';  // Import the Dashboard page
import AddJobPage from './pages/AddJobPage';
import ProfilePage from './pages/ProfilePage';
import AllJobPage from './pages/AllJobPage';
import Stats from './pages/Stats';
import MyApplicationsPage from './pages/MyApplicationsPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';

function App () {
  // Load from localStorage if present
  const getInitialRole = () => localStorage.getItem('role') || null;
  const getInitialEmail = () => localStorage.getItem('userEmail') || '';

  // Job state lifted up (persisted)
  const getInitialJobs = () => {
    const stored = localStorage.getItem('jobs');
    if (stored) return JSON.parse(stored);
    return [
      {
        position: 'Frontend Developer',
        company: 'Tech Solutions',
        jobLocation: 'New York',
        jobStatus: 'pending',
        jobType: 'full-time',
      },
      {
        position: 'Backend Engineer',
        company: 'InnovateX',
        jobLocation: 'San Francisco',
        jobStatus: 'interview',
        jobType: 'remote',
      },
      {
        position: 'UI/UX Designer',
        company: 'Creative Minds',
        jobLocation: 'Remote',
        jobStatus: 'declined',
        jobType: 'part-time',
      },
      {
        position: 'Data Scientist',
        company: 'DataWiz',
        jobLocation: 'Boston',
        jobStatus: 'pending',
        jobType: 'full-time',
      },
      {
        position: 'DevOps Engineer',
        company: 'CloudOps',
        jobLocation: 'Austin',
        jobStatus: 'interview',
        jobType: 'contract',
      },
      {
        position: 'Product Manager',
        company: 'Visionary Inc.',
        jobLocation: 'Seattle',
        jobStatus: 'pending',
        jobType: 'full-time',
      },
      {
        position: 'QA Tester',
        company: 'QualityFirst',
        jobLocation: 'Denver',
        jobStatus: 'declined',
        jobType: 'part-time',
      },
      {
        position: 'Mobile App Developer',
        company: 'Appify',
        jobLocation: 'Chicago',
        jobStatus: 'pending',
        jobType: 'remote',
      },
      {
        position: 'System Administrator',
        company: 'NetSecure',
        jobLocation: 'Miami',
        jobStatus: 'interview',
        jobType: 'full-time',
      },
      {
        position: 'Business Analyst',
        company: 'BizAnalytics',
        jobLocation: 'Atlanta',
        jobStatus: 'pending',
        jobType: 'contract',
      },
    ];
  };
  const [jobs, setJobs] = useState(getInitialJobs());

  // Role state: 'admin' or 'user' or null
  const [role, setRole] = useState(getInitialRole());
  // Track logged-in user's email
  const [userEmail, setUserEmail] = useState(getInitialEmail());
  // Applications state (persisted)
  const getInitialApplications = () => {
    const stored = localStorage.getItem('applications');
    return stored ? JSON.parse(stored) : [];
  };
  const [applications, setApplications] = useState(getInitialApplications());
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((d) => !d);

  // Persist applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Handler for user applying to a job
  const handleApply = (job, message) => {
    setApplications(prev => [
      ...prev,
      {
        job,
        message,
        date: new Date().toLocaleString(),
        userEmail,
        status: 'pending',
        adminResponse: '',
      },
    ]);
  };

  // Handler for admin to accept/reject applications
  const handleApplicationDecision = (idx, status, adminResponse) => {
    setApplications(prev => prev.map((app, i) =>
      i === idx ? { ...app, status, adminResponse } : app
    ));
  };

  // Function to add a job
  const addJob = (job) => {
    setJobs(prev => [...prev, job]);
  };

  // Handle login
  const handleLogin = (newRole, email) => {
    setRole(newRole);
    setUserEmail(email);
    localStorage.setItem('role', newRole);
    localStorage.setItem('userEmail', email);
  };

  // Handle logout
  const handleLogout = () => {
    setRole(null);
    setUserEmail('');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
  };

  // If not logged in, show login page only
  if (!role) {
    return <LoginPage onLogin={(role, email) => handleLogin(role, email)} />;
  }

  return (
    <div className={"min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage role={role} userEmail={userEmail} applications={applications} onLogout={handleLogout} addJob={addJob} onApplicationDecision={handleApplicationDecision} jobs={jobs} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />} />
        <Route path="/add-job" element={<AddJobPage addJob={addJob} role={role} userEmail={userEmail} onLogout={handleLogout} />} />
        <Route path="/all-jobs" element={<AllJobPage jobs={jobs} role={role} userEmail={userEmail} onApply={handleApply} onLogout={handleLogout} />} />
        <Route path="/profile" element={<ProfilePage role={role} userEmail={userEmail} onLogout={handleLogout} />} />
        <Route path="/stats" element={<Stats role={role} userEmail={userEmail} onLogout={handleLogout} />} />
        <Route path="/my-applications" element={<MyApplicationsPage applications={applications} userEmail={userEmail} role={role} onLogout={handleLogout} />} />
        <Route path="/applications" element={<AdminApplicationsPage applications={applications} role={role} userEmail={userEmail} onLogout={handleLogout} onApplicationDecision={handleApplicationDecision} />} />
      </Routes>
    </div>
  );
};

export default App;
