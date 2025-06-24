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
        <>
            <div className="w-screen flex">
                <div className="ml-20 w-[12%] flex items-center p-4">
                    <img className="w-12 h-12 flex items-center justify-center" src="src/assets/Logo.png" alt="Job Board Logo" />
                    <h2 className="text-teal-500 text-2xl font-semibold ml-2">Jobify</h2>
                </div>
                <div className="w-[78%]"><Navbar role={role} userEmail={userEmail} onLogout={onLogout} /></div>
            </div>
            <div className='flex w-screen'>
                <Sidebar role={role} />
                <div className='w-[80%] p-10'>
                    <h1 className="text-2xl font-bold mb-4">All Applications</h1>
                    {applications.length === 0 ? (
                        <p className="text-gray-500">No applications received yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {applications.map((app, idx) => (
                                <li key={idx} className="border rounded-lg p-4 bg-white shadow">
                                    <div className="font-semibold text-lg text-teal-600">{app.job.position} at {app.job.company}</div>
                                    <div className="text-gray-600 text-sm mb-2">Applied on: {app.date}</div>
                                    <div className="text-gray-800 mb-2">{app.message}</div>
                                    <div className="text-gray-500 text-sm mb-2">From: {app.userEmail}</div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Response message (optional)"
                                            className="border rounded px-2 py-1 text-sm flex-1"
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
                                            app.status === 'accepted' ? 'text-green-600 font-semibold' :
                                            app.status === 'rejected' ? 'text-red-600 font-semibold' : 'text-gray-500'
                                        }>
                                            Status: {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                        </span>
                                        {app.adminResponse && (
                                            <span className="ml-4 text-gray-700">Admin Response: {app.adminResponse}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminApplicationsPage; 