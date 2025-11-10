// src/components/shared/Header.jsx

import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../providers/AuthProvider'; // Use the exported hook

const Header = () => {
    const { user, logOut, loading } = useAuth(); // Access auth state

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('You have logged out.');
            })
            .catch(error => {
                console.error(error);
                toast.error('Logout failed.');
            });
    };

    // Show loading spinner/message while Firebase checks auth
    if (loading) {
        // Use a Tailwind spinner for a better UX than plain text
        return <div className="text-center p-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>; 
    }

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Home</NavLink></li>
            <li><NavLink to="/browse" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Browse Public Habits</NavLink></li>
            
            {/* Show private links only if user is logged in */}
            {user && (
                <>
                    <li><NavLink to="/add-habit" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>Add Habit</NavLink></li>
                    <li><NavLink to="/my-habits" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>My Habits</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-10">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl font-extrabold text-indigo-600">HabitHub</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    // --- LOGGED IN VIEW: User Photo/Dropdown ---
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName || user.email}>
                            <div className="w-10 rounded-full border-2 border-indigo-600">
                                <img 
                                    alt={user.displayName || "User"} 
                                    // Use user photo or a default fallback image
                                    src={user.photoURL || "https://i.ibb.co/6P6Xg4Z/placeholder-user.png"} 
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-gray-200">
                            <li className="font-bold p-2 truncate">Name: {user.displayName || 'N/A'}</li>
                            <li className="text-sm p-2 text-gray-500 truncate">Email: {user.email}</li>
                            <li>
                                <button onClick={handleLogout} className="btn btn-sm btn-error w-full mt-2 text-white">
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // --- NOT LOGGED IN VIEW: Login/Signup Buttons ---
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-outline btn-indigo-600">Login</Link>
                        <Link to="/register" className="btn bg-indigo-600 text-white hover:bg-indigo-700">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;