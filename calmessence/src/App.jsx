import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Adjust path as per your project structure
import ContactUs from './components/ContactUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQs from "./components/FAQs.jsx";
import "../src/index.css";

import { LiveVideo } from "./components/VideoCall";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

import BreathingDetails from './components/BreathingDetails';
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import CreateBreathingExercise from './components/CreateBreathingExercise.jsx';
import ArticleSearch from './components/ArticleSearch.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';
import CreateArticle from './components/CreateArticle.jsx';
import contactImage from './assets/logo.png';

import AuthPage from './components/Signup.jsx';
import ForgotPasswordPage from './components/ForgotPassword.jsx';
import LiveSession from "./components/LiveSession";

// Utility function to determine if the current path should display header and footer
const useShouldDisplayHeaderFooter = () => {
  // const location = useLocation();
  // const noHeaderFooterPaths = ['/live-session', '/videoCall'];
  // return !noHeaderFooterPaths.includes(location.pathname);
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
            className={`bg-base-100 text-black py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 z-10 top-0 ${sticky ? "shadow-md bg-base-200" : ""}`}>
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
              <div className={`md:flex flex-grow items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
                <div className="text-white md:flex md:justify-end md:space-x-4">
                  <div className="md:flex items-center justify-end space-x-4">
                    <Link to="/" className="block px-4 py-2 text-black font-bold hover:bg-base-200">Discover What We Offer</Link>
                    <Link to="/contact" className="block px-4 py-2 text-black font-bold hover:bg-base-200">Contact Us</Link>
                    <Link to="/faqs" className="block px-4 py-2 text-black font-bold hover:bg-base-200">FAQs</Link>
                  </div>
                </div>
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
        )}

        <main className="mx-auto">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/live-session" element={<LiveSession />} />
            <Route exact path="/videoCall" element={
              <AgoraRTCProvider client={AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })}>
                <LiveVideo />
              </AgoraRTCProvider>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/breathing" element={<Search />} />
            <Route path="/details" element={<BreathingDetails />} />
            <Route path="/create-breathing" element={<CreateBreathingExercise />} />
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/articles" element={<ArticleSearch />} />
            <Route path="/article-details" element={<ArticleDetail />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </main>

        {shouldDisplayHeaderFooter && <Footer />}
      </div>
    </Router>
  );
}

export default App;
