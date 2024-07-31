import { useEffect, useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfiole'; // Import UserProfile
import LandingPage from './components/LandingPage';
import ContactUs from './components/ContactUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQs from "./components/FAQs.jsx";
import "../src/index.css"
import MeditationSearch from './components/Meditations/MeditationSearch.jsx';
import MeditationPlay from './components/Meditations/MeditationPlay.jsx';
import { LiveVideo } from "./components/VideoCall";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import BreathingDetails from './components/BreathingDetails.jsx';
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import CreateBreathingExercise from './components/CreateBreathingExercise.jsx';
import ArticleSearch from './components/ArticleSearch.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';
import CreateArticle from './components/CreateArticle.jsx';
import ChatModule from './components/ChatModule.jsx';
import contactImage from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './components/Signup.jsx';
import ForgotPasswordPage from './components/ForgotPassword.jsx';
import LiveSession from "./components/LiveSession.jsx";
import PrivateRoute from "./components/PrivateRoute";
import JournalCatalog from "./components/JournalCatalog.jsx";
import Page from './components/Page.jsx';

const useShouldDisplayHeaderFooter = () => {
    return true;
};

function App() {
    const [sticky, setSticky] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        const handleScroll = () => {
            setSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const shouldDisplayHeaderFooter = useShouldDisplayHeaderFooter();

    return (
        <Router>
            <div className="font-poppins antialiased text-gray-900 bg-gray-100">
                {shouldDisplayHeaderFooter && (
                    <header
                        className={`bg-base-100 text-black py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 z-10 top-0 ${sticky ? "shadow-md bg-base-200" : ""}`}
                    >
                        <nav className="mx-auto flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={contactImage}
                                    alt="Calm Essence"
                                    className="w-10 h-10 md:w-15 md:h-15 rounded-full"
                                />
                                <div className="text-xl font-bold">Calm Essence</div>
                            </div>

                            <div className="flex md:hidden">
                                <button
                                    className="text-black p-2 focus:outline-none"
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
                            <div
                                className={`md:flex flex-grow items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
                            >
                                <div className="text-white md:flex md:justify-end md:space-x-4">
                                    <div className="md:flex items-center justify-end space-x-4">
                                        <NavLink to="/"
                                            className={({ isActive }) => isActive ? 'bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Home</NavLink>
                                        <NavLink to="/meditations"
                                            className={({ isActive }) => isActive ? 'bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Meditate</NavLink>
                                        <NavLink to="/breathing"
                                            className={({ isActive }) => isActive ? 'bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Breathing</NavLink>
                                        <NavLink to="/articles"
                                            className={({ isActive }) => isActive ? 'bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Article</NavLink>
                                        <NavLink to="/chats"
                                            className={({ isActive }) => isActive ? 'bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Chat</NavLink>
                                        <NavLink to="/live-session"
                                            className={({ isActive }) => isActive ? 'bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Live
                                            Session</NavLink>
                                        <NavLink to="/journal"
                                            className={({ isActive }) => isActive ? 'bg-black rounded-box block px-4 py-2 text-white font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Journal</NavLink>
                                    </div>
                                </div>
                            </div>

                            <UserProfile />
                        </nav>
                    </header>
                )}

                <main className="mx-auto">
                    <Routes>
                        <Route exact path="/" element={<LandingPage />} />
                        <Route exact path="/about" element={<LandingPage />} />
                        <Route exact path="/live-session" element={<PrivateRoute element={LiveSession} />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/faqs" element={<FAQs />} />
                        <Route path="/breathing" element={<Search />} />
                        <Route path="/articles" element={<ArticleSearch />} />
                        <Route path="/chats" element={<PrivateRoute element={ChatModule} />} />
                        <Route path="/signup" element={<AuthPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/create-article" element={<PrivateRoute element={CreateArticle} />} />
                        <Route path="/details" element={<BreathingDetails />} />
                        <Route path="/create-breathing" element={<PrivateRoute element={CreateBreathingExercise} />} />
                        <Route path="/article-details" element={<ArticleDetail />} />
                        <Route exact path="/videoCall" element={
                            <PrivateRoute element={() => (
                                <AgoraRTCProvider client={AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })}>
                                    <LiveVideo />
                                </AgoraRTCProvider>
                            )} />
                        }
                        />
                        <Route path="/meditations" element={<MeditationSearch />} />
                        <Route path="/meditations/:id" element={<MeditationPlay />} />
                        <Route path="/journal" element={<PrivateRoute element={JournalCatalog} />} />
                        <Route path='/page' element={<PrivateRoute element={Page} />} />
                    </Routes>
                </main>

                {shouldDisplayHeaderFooter && <Footer />}
            </div>
            <ToastContainer />

        </Router>
    );
}

export default App;
