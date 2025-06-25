import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Stats({ role, userEmail, onLogout }){
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
                <main className="flex-1 p-6 md:p-12 lg:p-16">
                    <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight">Statistics</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Placeholder stat cards */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 flex flex-col items-center">
                            <span className="text-4xl font-bold text-teal-600 dark:text-teal-300 mb-2">0</span>
                            <span className="text-lg text-gray-700 dark:text-gray-200">Jobs Applied</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 flex flex-col items-center">
                            <span className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-2">0</span>
                            <span className="text-lg text-gray-700 dark:text-gray-200">Interviews</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 flex flex-col items-center">
                            <span className="text-4xl font-bold text-red-600 dark:text-red-300 mb-2">0</span>
                            <span className="text-lg text-gray-700 dark:text-gray-200">Jobs Declined</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Stats;