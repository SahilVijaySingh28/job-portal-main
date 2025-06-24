import React from 'react';
import { FaBriefcase, FaChartBar, FaUser, FaPlusSquare, FaEnvelopeOpenText, FaTachometerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ role, sidebarOpen = true }) => {
    return (
        <>
            {/* Overlay for mobile when sidebar is open */}
            <div
                className={
                    `fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity duration-300 md:hidden ` +
                    (sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')
                }
                aria-hidden={!sidebarOpen}
            />
            <div
                className={
                    `fixed top-0 left-0 h-full w-64 bg-white shadow-md px-10 z-40 transition-transform duration-300 ` +
                    (sidebarOpen ? 'translate-x-0' : '-translate-x-full') +
                    ' md:static md:translate-x-0 md:flex md:flex-col'
                }
            >
                {/* Navigation Links */}
                <nav className="flex flex-col gap-5 mt-6">
                    <Link to={"/dashboard"} className="flex items-center text-2xl p-2 text-gray-600 hover:text-teal-600">
                        <FaTachometerAlt className="mr-3" />
                        <span>Dashboard</span>
                    </Link>
                    {role === 'admin' && (
                        <Link to={'/add-job'} className="flex items-center  text-2xl p-2 text-gray-600 hover:text-teal-500">
                            <FaPlusSquare className="mr-3" />
                            <span>Add Job</span>
                        </Link>
                    )}
                    <Link to={"/all-jobs"} className="flex items-center text-2xl  p-2 text-gray-600 hover:text-teal-600">
                        <FaBriefcase className="mr-3" />
                        <span>All Jobs</span>
                    </Link>
                    <Link to={"/stats"} className="flex items-center text-2xl p-2 text-gray-600 hover:text-teal-500">
                        <FaChartBar className="mr-3" />
                        <span>Stats</span>
                    </Link>
                    <Link to={"/profile"} className="flex items-center text-2xl p-2 text-gray-600 hover:text-teal-500">
                        <FaUser className="mr-3" />
                        <span>Profile</span>
                    </Link>
                    {role === 'user' && (
                        <Link to={'/my-applications'} className="flex items-center text-2xl p-2 text-gray-600 hover:text-teal-500">
                            <FaEnvelopeOpenText className="mr-3" />
                            <span>My Applications</span>
                        </Link>
                    )}
                    {role === 'admin' && (
                        <Link to={'/applications'} className="flex items-center text-2xl p-2 text-gray-600 hover:text-teal-500">
                            <FaEnvelopeOpenText className="mr-3" />
                            <span>Applications</span>
                        </Link>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
