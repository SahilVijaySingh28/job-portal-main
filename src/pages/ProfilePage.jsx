import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

function ProfilePage({ role, userEmail, onLogout }){
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
                    <Profile/>
                </div>
            </div>
        </>
    );
};
export default ProfilePage;