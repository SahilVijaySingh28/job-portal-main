import React, { useState } from 'react';

function AddJob({ addJob }) {
    const [form, setForm] = useState({
        position: '',
        company: '',
        jobLocation: 'Codeville',
        jobStatus: 'pending',
        jobType: 'full-time',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addJob) {
            addJob(form);
            setForm({
                position: '',
                company: '',
                jobLocation: 'Codeville',
                jobStatus: 'pending',
                jobType: 'full-time',
            });
        }
    };

    return (
        <section className="bg-gray-50 p-6 md:p-10 rounded-lg max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Add Job</h2>
            <form onSubmit={handleSubmit} className="grid gap-6 
        sm:grid-cols-1
        md:grid-cols-6
        lg:grid-cols-6
        xl:grid-cols-12
        ">
                {/* Position */}
                <div className="md:col-span-2 xl:col-span-3 flex flex-col">
                    <label htmlFor="position" className="mb-2 text-gray-700 font-medium">Position</label>
                    <input
                        id="position"
                        name="position"
                        type="text"
                        value={form.position}
                        onChange={handleChange}
                        placeholder="Enter position"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        required
                    />
                </div>

                {/* Company */}
                <div className="md:col-span-2 xl:col-span-3 flex flex-col">
                    <label htmlFor="company" className="mb-2 text-gray-700 font-medium">Company</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Enter company"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        required
                    />
                </div>

                {/* Job Location */}
                <div className="md:col-span-2 xl:col-span-3 flex flex-col">
                    <label htmlFor="jobLocation" className="mb-2 text-gray-700 font-medium">Job Location</label>
                    <input
                        id="jobLocation"
                        name="jobLocation"
                        type="text"
                        value={form.jobLocation}
                        onChange={handleChange}
                        placeholder="Enter job location"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        required
                    />
                </div>

                {/* Job Status */}
                <div className="md:col-span-2 xl:col-span-3 flex flex-col">
                    <label htmlFor="jobStatus" className="mb-2 text-gray-700 font-medium">Job Status</label>
                    <select
                        id="jobStatus"
                        name="jobStatus"
                        value={form.jobStatus}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        required
                    >
                        <option value="pending">pending</option>
                        <option value="interview">interview</option>
                        <option value="declined">declined</option>
                    </select>
                </div>

                {/* Job Type */}
                <div className="md:col-span-2 xl:col-span-3 flex flex-col">
                    <label htmlFor="jobType" className="mb-2 text-gray-700 font-medium">Job Type</label>
                    <select
                        id="jobType"
                        name="jobType"
                        value={form.jobType}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        required
                    >
                        <option value="full-time">full-time</option>
                        <option value="part-time">part-time</option>
                        <option value="remote">remote</option>
                        <option value="internship">internship</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 xl:col-span-6 flex items-end">
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white font-semibold rounded-md py-3 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
}
export default AddJob;

