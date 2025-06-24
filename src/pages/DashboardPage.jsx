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
        <>
            <div className="w-screen flex">
                <div className="ml-20 w-[12%] flex items-center p-4">
                    <img className="w-12 h-12 flex items-center justify-center" src="src/assets/Logo.png" alt="Job Board Logo" />
                    <h2 className="text-teal-500 text-2xl font-semibold ml-2">Jobify</h2>
                </div>
                <div className="w-[78%]">
                    <Navbar role={role} userEmail={userEmail} onLogout={onLogout} onSidebarToggle={toggleSidebar} onToggleDarkMode={onToggleDarkMode} darkMode={darkMode} />
                </div>
            </div>
            <div className={
                'flex min-h-screen ' + (darkMode ? 'dark' : '')
            }>
                <Sidebar role={role} sidebarOpen={sidebarOpen} />
                <div className={
                    'flex-grow p-10 transition-all duration-300 ' +
                    (sidebarOpen ? '' : 'ml-[-16rem] md:ml-0') +
                    ' bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen'
                }>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Welcome {isAdmin ? 'Admin' : userName}!</h1>
                        <div className="flex flex-wrap gap-8 mt-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg p-6 min-w-[180px] border border-gray-200 dark:border-gray-700">
                                <div className="text-gray-500 dark:text-gray-300 text-lg">Total Jobs</div>
                                <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{totalJobs}</div>
                            </div>
                            {isAdmin && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg p-6 min-w-[180px] border border-gray-200 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-300 text-lg">Total Applications</div>
                                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{totalApplications}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Stylish Job Preview */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">Latest Jobs</h2>
                        {latestJobs.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-300">No jobs to preview yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {latestJobs.map((job, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 border border-teal-100 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-xl p-6 hover:shadow-2xl dark:hover:shadow-2xl transition group cursor-pointer">
                                        <div className="flex items-center mb-3">
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
                    </div>
                    {isAdmin && (
                        <AddJob addJob={addJob} />
                    )}
                    {isAdmin && (
                        <div className="mt-10">
                            <h2 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">Job Applications</h2>
                            {applications.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-300">No applications received yet.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {applications.map((app, idx) => (
                                        <li key={idx} className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow dark:shadow-lg border-gray-200 dark:border-gray-700">
                                            <div className="font-semibold text-lg text-teal-600 dark:text-teal-300">{app.job.position} at {app.job.company}</div>
                                            <div className="text-gray-600 dark:text-gray-300 text-sm mb-2">Applied on: {app.date}</div>
                                            <div className="text-gray-800 dark:text-gray-100 mb-2">{app.message}</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">From: {app.userEmail}</div>
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
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
