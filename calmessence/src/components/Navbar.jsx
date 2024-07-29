import  { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import logo from '../../public/logo.png';

function Navbar() {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className={`navbar bg-base-100 p-5 fixed left-0 right-0 top-0 z-50 ${sticky ? "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out" : ""}`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to="/breathing" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Breathing</NavLink></li>
                            <li><NavLink to="/live-session" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Live Session</NavLink></li>
                            <li><NavLink to="/chat" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Chat</NavLink></li>
                            <li><NavLink to="/journal" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Journal</NavLink></li>
                            <li><NavLink to="/articles" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Articles</NavLink></li>
                        </ul>
                    </div>
                    <img src={""} className="w-10 h-10 md:w-19 md:h-19 rounded-full" alt="Calm Essence" />
                    <a className="text-2xl font-bold cursor-pointer p-4">Calm Essence</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/breathing" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Breathing</NavLink></li>
                        <li><NavLink to="/live-session" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Live Session</NavLink></li>
                        <li><NavLink to="/chat" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Chat</NavLink></li>
                        <li><NavLink to="/journal" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Journal</NavLink></li>
                        <li><NavLink to="/articles" className={({ isActive }) => isActive ? 'bg-black text-white' : ''}>Articles</NavLink></li>
                    </ul>
                </div>
                <div className="avatar navbar-end">
                    <div className="w-10 md:w-15 md:h-15 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
