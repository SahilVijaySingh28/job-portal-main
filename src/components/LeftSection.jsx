import Button from './utilities/Button.jsx';
import React from 'react';
import { Link } from 'react-router-dom';
function LeftSection() {
    return (
        <>
            <div className="w-[672px] h-[260px]">

                <h1 className="text-7xl font-bold  mb-10">Job <span className="text-teal-500">Tracking</span> App</h1>

                <p className="text-gray-600 w-145 text-xl leading-8 mb-10">
                    Jobify is your go-to platform for finding your dream job or posting exciting career opportunities. Whether you're a job seeker or an employer, Jobify connects talent with the best jobs. Join us today and start building your career or team!
                </p>

                <div className="flex justify items-center mb-10 gap-4">

                    <Link
                        to="/login"
                        className="bg-[#34c3d0] text-white py-2 px-6 rounded-lg hover:bg-teal-500"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/login"
                        className="bg-[#34c3d0] text-white py-2 px-6 rounded-lg hover:bg-teal-500"
                    >
                        Register
                    </Link>
                </div>

            </div>
        </>
    )
}

export default LeftSection;