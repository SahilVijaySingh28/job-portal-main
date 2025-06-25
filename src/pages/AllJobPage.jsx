import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React, { useState } from 'react';
// import AddJob from '../components/Addjob';

function AllJobPage({ jobs = [], role, userEmail, onApply, onLogout }){
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicationMsg, setApplicationMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleApplyClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
        setApplicationMsg('');
        setSuccessMsg('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onApply && selectedJob) {
            onApply(selectedJob, applicationMsg);
            setSuccessMsg('Application sent!');
            setTimeout(() => setShowModal(false), 1200);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-sm flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10" src="/assets/Logo.png" alt="Job Board Logo" />
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
                    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">All Jobs</h1>
                    {jobs.length === 0 ? (
                        <p className="text-gray-500">No jobs added yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {jobs.map((job, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 flex flex-col gap-2 hover:shadow-2xl transition">
                                    <div className="font-semibold text-xl text-teal-700 mb-1">{job.position} <span className="text-gray-500 font-normal">at</span> {job.company}</div>
                                    <div className="text-gray-600">Location: <span className="font-medium">{job.jobLocation}</span></div>
                                    <div className="flex gap-2 mt-2">
                                        <span className={
                                            (job.jobStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' :
                                            job.jobStatus === 'interview' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                                            job.jobStatus === 'declined' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200')
                                            + " px-3 py-1 rounded-full text-xs font-semibold"
                                        }>
                                            {job.jobStatus.charAt(0).toUpperCase() + job.jobStatus.slice(1)}
                                        </span>
                                        <span className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200 px-3 py-1 rounded-full text-xs font-semibold">
                                            {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                                        </span>
                                    </div>
                                    {role === 'user' && (
                                        <button
                                            className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded shadow transition"
                                            onClick={() => handleApplyClick(job)}
                                        >
                                            Apply
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Modal for application */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-200 dark:border-gray-700">
                                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
                                <h2 className="text-xl font-bold mb-4 text-teal-700 dark:text-teal-300">Apply for {selectedJob?.position} at {selectedJob?.company}</h2>
                                <form onSubmit={handleSubmit}>
                                    <textarea
                                        className="w-full border rounded p-2 mb-4 min-h-[80px] focus:ring-2 focus:ring-teal-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                        placeholder="Write your application message here..."
                                        value={applicationMsg}
                                        onChange={e => setApplicationMsg(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded font-semibold hover:bg-teal-700 transition">Send Application</button>
                                </form>
                                {successMsg && <div className="text-green-600 mt-4 text-center font-semibold">{successMsg}</div>}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
export default AllJobPage;