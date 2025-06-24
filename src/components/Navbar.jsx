import { FaAlignLeft, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineNightlightRound } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ role, userEmail, onLogout, onSidebarToggle, onToggleDarkMode, darkMode }) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const showMenu = () => {
        setToggleMenu(!toggleMenu);
    }
    // Determine display name
    let displayName = 'User';
    if (role === 'admin') {
        displayName = 'Admin';
    } else if (userEmail) {
        displayName = userEmail.split('@')[0];
    }
    return (
        <>
            <div className="flex justify-between items-center h-20 px-2 py-4">
                <div className="flex justify-between items-center p-4 text-3xl text-teal-500">
                    {onSidebarToggle ? (
                        <button onClick={onSidebarToggle} className="focus:outline-none">
                            <FaAlignLeft />
                        </button>
                    ) : (
                        <FaAlignLeft />
                    )}
                </div>

                <div className="relative">
                <div className="flex items-center justify-evenly transition-colors duration-300 w-40 h-15 gap-2">
                    <div>
                        <button
                            className={"text-2xl px-4 py-2 focus:outline-none " + (darkMode ? 'text-yellow-400' : 'text-gray-500')}
                            onClick={onToggleDarkMode}
                            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            <MdOutlineNightlightRound />
                        </button>
                    </div>
                    <button onClick={showMenu} className="flex justify-evenly items-center gap-3 h-10 rounded-xl px-4 py-2 bg-teal-500 text-white text-xl cursor-pointer">
                        <FaRegUserCircle />
                        <span className="font-semibold text-center">
                            {displayName}
                        </span>
                        <TiArrowSortedDown />
                    </button>
                </div>
                {toggleMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                        <button
                            onClick={onLogout}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                )}
                </div>
            </div>
        </>
    )
}

export default Navbar;