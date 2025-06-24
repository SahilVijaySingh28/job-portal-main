import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function MyApplicationsPage({ applications, userEmail, role, onLogout }) {
    const myApps = applications.filter(app => app.userEmail === userEmail);
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
                    <h1 className="text-2xl font-bold mb-4">My Applications</h1>
                    {myApps.length === 0 ? (
                        <p className="text-gray-500">You have not applied to any jobs yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {myApps.map((app, idx) => (
                                <li key={idx} className="border rounded-lg p-4 bg-white shadow">
                                    <div className="font-semibold text-lg text-teal-600">{app.job.position} at {app.job.company}</div>
                                    <div className="text-gray-600 text-sm mb-2">Applied on: {app.date}</div>
                                    <div className="text-gray-800 mb-2">{app.message}</div>
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

export default MyApplicationsPage; 