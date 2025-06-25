import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddJob from '../components/AddJob';
import { FaBriefcase, FaMapMarkerAlt, FaBuilding, FaClock } from 'react-icons/fa';

const DashboardPage = ({ role, userEmail, applications = [], onLogout, addJob, onApplicationDecision, jobs = [], onToggleDarkMode, darkMode }) => {
    const [responseMsg, setResponseMsg] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(open => !open);

    const handleDecision = (idx, status) => {
        const msg = responseMsg[idx] || '';
        onApplicationDecision(idx, status, msg);
        setResponseMsg(prev => ({ ...prev, [idx]: '' }));
    };

    // Dashboard summary (customize as needed)
    const isAdmin = role === 'admin';
    const totalJobs = jobs.length;
    const totalApplications = applications.length;
    const latestJobs = jobs.slice(-3).reverse(); // Show up to 3 latest jobs
    // Get user name from email for greeting
    let userName = 'User';
    if (!isAdmin && userEmail) {
        userName = userEmail.split('@')[0];
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-sm flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10" src="/assets/Logo.png" alt="Job Board Logo" />
                    <span className="text-2xl font-bold text-teal-600 tracking-tight">Jobify</span>
                </div>
                <Navbar role={role} userEmail={userEmail} onLogout={onLogout} onSidebarToggle={toggleSidebar} onToggleDarkMode={onToggleDarkMode} darkMode={darkMode} />
            </header>
            <div className="flex min-h-[calc(100vh-72px)]">
                {/* Sidebar */}
                <aside className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden`}>
                    <Sidebar role={role} sidebarOpen={sidebarOpen} />
                </aside>
                {/* Main Content */}
                <main className="flex-1 p-6 md:p-12 lg:p-16">
                    <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">Welcome {isAdmin ? 'Admin' : userName}!</h1>
                    {/* Stats Cards */}
                    <div className="flex flex-wrap gap-8 mb-10">
                        <div className="flex-1 min-w-[200px] bg-gradient-to-br from-teal-100 to-white dark:from-teal-900 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-teal-200 dark:border-teal-800 flex flex-col items-center hover:scale-105 transition-transform">
                            <FaBriefcase className="text-3xl text-teal-500 mb-2" />
                            <div className="text-gray-500 dark:text-gray-300 text-lg">Total Jobs</div>
                            <div className="text-3xl font-bold text-teal-700 dark:text-teal-300">{totalJobs}</div>
                        </div>
                        {isAdmin && (
                            <div className="flex-1 min-w-[200px] bg-gradient-to-br from-blue-100 to-white dark:from-blue-900 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-blue-200 dark:border-blue-800 flex flex-col items-center hover:scale-105 transition-transform">
                                <FaBriefcase className="text-3xl text-blue-500 mb-2" />
                                <div className="text-gray-500 dark:text-gray-300 text-lg">Total Applications</div>
                                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{totalApplications}</div>
                            </div>
                        )}
                    </div>
                    {/* Latest Jobs */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Latest Jobs</h2>
                        {latestJobs.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-300">No jobs to preview yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {latestJobs.map((job, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition group cursor-pointer flex flex-col gap-2">
                                        <div className="flex items-center mb-2">
                                            <FaBriefcase className="text-teal-500 text-2xl mr-2 group-hover:scale-110 transition-transform" />
                                            <span className="text-xl font-semibold text-teal-700 dark:text-teal-300 group-hover:text-teal-900 dark:group-hover:text-teal-200 transition">{job.position}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                                            <FaBuilding className="mr-2 text-lg" />
                                            <span className="font-medium">{job.company}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                                            <FaMapMarkerAlt className="mr-2 text-lg" />
                                            <span>{job.jobLocation}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                                            <FaClock className="mr-2 text-lg" />
                                            <span className="capitalize">{job.jobType}</span>
                                        </div>
                                        <div className="mt-2">
                                            <span className={
                                                (
                                                    job.jobStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                                                    job.jobStatus === 'interview' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                                                    job.jobStatus === 'declined' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
                                                ) + " px-3 py-1 rounded-full text-xs font-semibold"
                                            }>
                                                {job.jobStatus.charAt(0).toUpperCase() + job.jobStatus.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                    {/* Admin: Add Job & Applications */}
                    {isAdmin && (
                        <section className="mb-12">
                            <AddJob addJob={addJob} />
                        </section>
                    )}
                    {isAdmin && (
                        <section className="mt-10">
                            <h2 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Job Applications</h2>
                            {applications.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-300">No applications received yet.</p>
                            ) : (
                                <ul className="space-y-6">
                                    {applications.map((app, idx) => (
                                        <li key={idx} className="border rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700 flex flex-col gap-2">
                                            <div className="font-semibold text-lg text-teal-600 dark:text-teal-300">{app.job.position} at {app.job.company}</div>
                                            <div className="text-gray-600 dark:text-gray-300 text-sm mb-1">Applied on: {app.date}</div>
                                            <div className="text-gray-800 dark:text-gray-100 mb-1">{app.message}</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">From: {app.userEmail}</div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Response message (optional)"
                                                    className="border rounded px-2 py-1 text-sm flex-1 bg-white dark:bg-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-700"
                                                    value={responseMsg[idx] || ''}
                                                    onChange={e => setResponseMsg(prev => ({ ...prev, [idx]: e.target.value }))}
                                                    disabled={app.status !== 'pending'}
                                                />
                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                                                    onClick={() => handleDecision(idx, 'accepted')}
                                                    disabled={app.status !== 'pending'}
                                                >Accept</button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                                                    onClick={() => handleDecision(idx, 'rejected')}
                                                    disabled={app.status !== 'pending'}
                                                >Reject</button>
                                            </div>
                                            <div className="text-sm">
                                                <span className={
                                                    app.status === 'accepted' ? 'text-green-600 dark:text-green-400 font-semibold' :
                                                    app.status === 'rejected' ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-300'
                                                }>
                                                    Status: {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </span>
                                                {app.adminResponse && (
                                                    <span className="ml-4 text-gray-700 dark:text-gray-200">Admin Response: {app.adminResponse}</span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
