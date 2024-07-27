import  {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes,} from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Adjust path as per your project structure
import ContactUs from './components/ContactUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQs from "./components/FAQs.jsx";
import "../src/index.css"
import AuthPage from './components/Signup.jsx';
import ForgotPasswordPage from './components/ForgotPassword.jsx';
function App() {


    useEffect(() => {
        AOS.init({duration: 1000});
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <Router>

            <div className="font-poppins antialiased text-gray-900 bg-gray-100">
                <header
                    className="bg-purple-500 text-white py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 fixed w-full z-10 top-0">
                    <nav className="mx-auto flex justify-between bg-purple-500 w-full">
                        <div className={`text-2xl flex items-center font-bold ${isOpen ? 'hidden' : 'block'}`}>CalmEssence</div>
                        <div className="flex md:hidden">
                            <button
                                className="text-white p-2 focus:outline-none"
                                onClick={toggleMenu}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className={`md:flex flex-grow items-center justify-end ${isOpen ? 'block' : 'hidden'}`}>
                            <div className="text-white md:flex md:justify-end md:space-x-4">
                                <div className="md:flex items-center justify-end space-x-4">
                                    <Link to="/" className="block px-4 py-2 text-white font-bold">Discover What We
                                        Offer</Link>
                                    <Link to="/contact" className="block px-4 py-2 text-white font-bold">Contact Us</Link>
                                    <Link to="/faqs" className="block px-4 py-2 text-white font-bold">FAQs</Link>
                                </div>

                            </div>
                        </div>
                    </nav>
                </header>


                <Routes>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route path="/contact" element={<ContactUs/>}/>
                    <Route path="/faqs" element={<FAQs/>}/>
                    <Route path="/signup" element={<AuthPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                </Routes>
            </div>

        </Router>
    );
}

export default App;
