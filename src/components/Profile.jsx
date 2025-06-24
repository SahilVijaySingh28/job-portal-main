import React from 'react';

const Profile = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select An Image File (Max 0.5 MB)
                </label>
                <input type="file" className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-400" />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="block w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-400" placeholder="Zippy" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" className="block w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-400" placeholder="ShakeAndBake" />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="block w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-400" placeholder="test@test.com" />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" className="block w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-400" placeholder="Codeville" />
                </div>

                <div className="mt-6">
                    <button className="w-full px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 transition duration-200">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
