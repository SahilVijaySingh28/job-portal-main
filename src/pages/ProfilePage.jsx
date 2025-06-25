import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';

function ProfilePage({ role, userEmail, onLogout }){
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
                <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
                    <div className="w-full max-w-2xl">
                        <Profile />
                    </div>
                </main>
            </div>
        </div>
    );
};
export default ProfilePage;