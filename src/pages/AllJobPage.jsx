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
                    <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
                    {jobs.length === 0 ? (
                        <p className="text-gray-500">No jobs added yet.</p>
                    ) : (
                        <ul className="space-y-6">
                            {jobs.map((job, idx) => (
                                <li key={idx} className="border rounded-lg p-6 shadow-md bg-white flex flex-col md:flex-row md:items-center md:justify-between transition hover:shadow-lg">
                                    <div>
                                        <div className="font-semibold text-xl text-teal-700 mb-1">{job.position} <span className="text-gray-500 font-normal">at</span> {job.company}</div>
                                        <div className="text-gray-600">Location: <span className="font-medium">{job.jobLocation}</span></div>
                                        <div className="text-gray-600">Status: <span className="font-medium">{job.jobStatus}</span></div>
                                        <div className="text-gray-600">Type: <span className="font-medium">{job.jobType}</span></div>
                                    </div>
                                    {role === 'user' && (
                                        <button
                                            className="mt-4 md:mt-0 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded shadow transition"
                                            onClick={() => handleApplyClick(job)}
                                        >
                                            Apply
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    {/* Modal for application */}
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
                                <h2 className="text-xl font-bold mb-4">Apply for {selectedJob?.position} at {selectedJob?.company}</h2>
                                <form onSubmit={handleSubmit}>
                                    <textarea
                                        className="w-full border rounded p-2 mb-4 min-h-[80px] focus:ring-2 focus:ring-teal-400"
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
                </div>
            </div>
        </>
    )
}
export default AllJobPage;