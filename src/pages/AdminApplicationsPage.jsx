import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function AdminApplicationsPage({ applications = [], role, userEmail, onLogout, onApplicationDecision }) {
    const [responseMsg, setResponseMsg] = useState({});

    const handleDecision = (idx, status) => {
        const msg = responseMsg[idx] || '';
        onApplicationDecision(idx, status, msg);
        setResponseMsg(prev => ({ ...prev, [idx]: '' }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-sm flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10" src="src/assets/Logo.png" alt="Job Board Logo" />
                    <span className="text-2xl font-bold text-teal-600 tracking-tight">Jobify</span>
                </div>
                <Navbar role={role} userEmail={userEmail} onLogout={onLogout} />
            </header>
            <div className="flex min-h-[calc(100vh-72px)]">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg">
                    <Sidebar role={role} />
                </aside>
                {/* Main Content */}
                <main className="flex-1 p-6 md:p-12 lg:p-16">
                    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">All Applications</h1>
                    {applications.length === 0 ? (
                        <p className="text-gray-500">No applications received yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {applications.map((app, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 flex flex-col gap-2 hover:shadow-2xl transition">
                                    <div className="font-semibold text-lg text-teal-600">{app.job.position} <span className="text-gray-500 font-normal">at</span> {app.job.company}</div>
                                    <div className="text-gray-600 text-sm mb-1">Applied on: {app.date}</div>
                                    <div className="text-gray-800 dark:text-gray-100 mb-1">{app.message}</div>
                                    <div className="text-gray-500 text-sm mb-1">From: {app.userEmail}</div>
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
                                    <div className="flex gap-2 items-center text-sm mb-1">
                                        <span className={
                                            app.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                                        + ' px-3 py-1 rounded-full font-semibold'}>
                                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                        </span>
                                        {app.adminResponse && (
                                            <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full">Admin: {app.adminResponse}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default AdminApplicationsPage; 