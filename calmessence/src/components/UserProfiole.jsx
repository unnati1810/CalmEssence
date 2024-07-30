import  { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const popupRef = useRef(null);
    const userEmailRef = useRef(null);

    const handleLogout = () => {
        logout(); // Clear user and token from context
        setPopupVisible(false); // Hide the popup
    };

    // Handle clicks outside the popup
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                !userEmailRef.current.contains(event.target)
            ) {
                setPopupVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {user ? (
                <div className="relative">
                    <div
                        className="hidden md:flex items-center cursor-pointer"
                        ref={userEmailRef}
                        onClick={() => setPopupVisible(!isPopupVisible)}
                    >
                        <span className="text-gray-700 text-lg">{user.email}</span>
                    </div>

                    {isPopupVisible && (
                        <div
                            className="absolute top-full mt-2 right-0 bg-white border border-gray-300 shadow-lg rounded-md p-4"
                            ref={popupRef}
                        >
                            <button
                                onClick={handleLogout}
                                className="bg-zinc-950 hover:bg-base-300 hover:text-black text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <NavLink to="/signup" className='bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200'>Login</NavLink>
            )}
        </div>
    );
};

export default UserProfile;
