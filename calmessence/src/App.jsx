import  {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes,} from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Adjust path as per your project structure
import ContactUs from './components/ContactUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQs from "./components/FAQs.jsx";
import "../src/index.css"
// import Navbar from './components/Navbar';
import BreathingDetails from './components/BreathingDetails';
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import CreateBreathingExercise from "./components/CreateBreathingExercise.jsx";
import ArticleSearch from "./components/ArticleSearch.jsx";
import ArticleDetail from "./components/ArticleDetail.jsx";
import CreateArticle from "./components/CreateArticle.jsx";
import contactImage from './assets/logo.png';

function App() {

    const [sticky, setSticky] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        AOS.init({duration: 1000});
         const handleScroll = () => {
                    setSticky(window.scrollY > 0);
                };

                window.addEventListener('scroll', handleScroll);

                return () => {
                    window.removeEventListener('scroll', handleScroll);
                };
    }, []);


    return (
        <Router>
            <div className="font-poppins antialiased text-gray-900 bg-gray-100">
                <header className={`bg-purple-500 text-white py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 fixed w-full z-10 top-0 transition-all duration-300 ease-in-out ${sticky ? "shadow-md bg-purple-700" : ""}`}>
                    <nav className="mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img
                                src={contactImage}
                                alt="Calm Essence"
                                className="w-10 h-10 md:w-15 md:h-15 rounded-full"
                            />
                             <div className="text-xl font-bold">Calm Essence</div>
                        </div>

                        {/* Mobile Menu Button */}
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

                        {/* Navbar Links */}
                        <div className={`md:flex flex-grow items-center justify-center space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
                            <Link to="/" className="block px-4 py-2 text-white font-bold">Discover What We Offer</Link>
                            <Link to="/contact" className="block px-4 py-2 text-white font-bold">Contact Us</Link>
                            <Link to="/faqs" className="block px-4 py-2 text-white font-bold">FAQs</Link>
                        </div>

                        {/* Avatar / User Icon */}
                        <div className="hidden md:flex items-center">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                alt="User Avatar"
                                className="w-10 h-10 md:w-15 md:h-15 rounded-full"
                            />
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route path="/contact" element={<ContactUs/>}/>
                    <Route path="/faqs" element={<FAQs/>}/>

                      <Route path="/breathing" element={

                                                <Search />

                                    } />
                                    <Route path="/details" element={<BreathingDetails />} />
                                    <Route path="/create-breathing" element={<CreateBreathingExercise />} />
                                    <Route path="/create-article" element={<CreateArticle />} />
                                    <Route path="/articles" element={<ArticleSearch />} />
                                    <Route path="/article-details" element={<ArticleDetail />} />

                </Routes>
                                                            <Footer />

            </div>

        </Router>
    );
}

export default App;
