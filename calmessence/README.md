# Group 8
## Proposal Web Application (D1_Group8)

* *Date Created*: 21 June 2024
* *Last Modification Date*: 21 June 2024
* *Website URL*: <https://thecalmessence.netlify.app/>
* *Git URL*: <https://git.cs.dal.ca/parkar/CSCI-5709-Group8>


## Team Members

* Nikulkumar Kukadiya (nk865270@dal.ca)
* Unnati Kapadia (un421671@dal.ca)
* Avadh Rakholiya (av786964@dal.ca)
* Rameez Parkar (rameez.parkar@dal.ca)
* Vishesh Patel (vs263774@dal.ca)
* Siddharth Bhardwaj (sd812175@dal.ca)


## Deployment

The project code available in the CalmEssencce directory was pushed to Github and then using the Netlify deployment deployed to the server.

Steps of Deployment:
1. Upload your code to the main branch of the GitHub repository.
2. Retrieve the calmessence project from GitHub and import it into Netlify.
3. Configure the build settings using npm run build and adjust the publish directory for deploying the application.
4. Access the live application at https://thecalmessence.netlify.app/.

## Built With

* [React](https://legacy.reactjs.org/docs/getting-started.html/) - The web framework used.
* [npm](https://docs.npmjs.com//) - Dependency Management
* [TailwindCSS](https://tailwindcss.com/) - Used for CSS and Responsiveness
* [Axios](https://www.npmjs.com/package/axios) - Used for API calls to the backend.
* [Fortawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) - Used for icons.
* [ReactToastify](https://www.npmjs.com/package/react-toastify?activeTab=readme) - Used for toast messages for success and errors
* [AOS](https://www.npmjs.com/package/aos) - Animate on scroll library.
* [PropTypes](https://www.npmjs.com/package/prop-types) - Used for type-checking in React.
* [React Router DOM](https://www.npmjs.com/package/react-router-dom) - Used for routing in React applications.
* [React Scroll](https://www.npmjs.com/package/react-scroll) - Used for scrolling animations in React.

## Sources Used


### App.jsx

```
import  {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes,} from 'react-router-dom';
import LandingPage from './components/LandingPage'; // Adjust path as per your project structure
import ContactUs from './components/ContactUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FAQs from "./components/FAQs.jsx";
import "../src/index.css"
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
                    <nav className="mx-auto flex justify-between bg-purple-500">
                        <div className={`text-2xl font-bold ${isOpen ? 'hidden' : 'block'}`}>CalmEssence</div>
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
                        <div className={`md:flex flex-grow items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
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
                </Routes>
            </div>

        </Router>
    );
}

export default App;


```
In this file, we used the React framework to create the application and TailwindCSS to style the navigation bar. We also used React Router to manage the paths for the Contact Us, FAQs, and landing page screens.

### LandingPage.jsx

```
import {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import meditateImage from '../assets/meditate.png';
import breathingImage from '../assets/breathing.png';
import chatImage from '../assets/chat.png';
import liveSessionsImage from '../assets/video_ssdk.png';
import articlesImage from '../assets/article.jpeg';
import journalImage from '../assets/journal.png';
import meditationVideo from '../assets/meditation_home.mp4';

const LandingPage = () => {
    useEffect(() => {
        AOS.init({duration: 1000});
    }, []);

    const features = [
        {
            title: "Meditations",
            description: "Enhance your well-being with a variety of guided meditations and mindfulness techniques. Whether you're starting out or seasoned, our sessions help you find peace and clarity through soothing music and expert guidance.",
            subDescription: "Explore tailored meditation practices designed for relaxation, focus, better sleep, and emotional balance.",
            image: meditateImage,
            aos: "fade-right",
        },
        {
            title: "Breathing Exercises",
            description: "Master simple yet effective breathing techniques with our user-friendly guides, designed to promote relaxation and mindfulness in your daily life. These exercises empower you to breathe better, reduce stress, and enhance your overall well-being.",
            subDescription: "Improve mental clarity and relaxation through guided breathing exercises.",
            image: breathingImage,
            aos: "fade-left",
        },
        {
            title: "Chat with Experts",
            description: "Connect with certified mindfulness coaches for personalized advice and support through our convenient chat feature. Discuss your goals, receive feedback on your practice, and gain insights to enhance your mindfulness journey.",
            subDescription: "Access one-on-one guidance from experienced mindfulness experts.",
            image: chatImage,
            aos: "fade-right",
        },
        {
            title: "Live Sessions",
            description: "Participate in live sessions led by mindfulness professionals to learn and practice mindfulness techniques. Engage in interactive experiences, including guided meditations and Q&A sessions, to deepen your understanding and practice of mindfulness.",
            subDescription: "Join real-time mindfulness sessions conducted by experienced instructors.",
            image: liveSessionsImage,
            aos: "fade-left",
        },
        {
            title: "Mindfulness Articles",
            description: "Read various articles on mindfulness to deepen your understanding and practice. Access a rich collection of resources covering meditation techniques, mental well-being, and practical tips for integrating mindfulness into daily life.",
            subDescription: "Explore insightful articles written by mindfulness experts.",
            image: articlesImage,
            aos: "fade-right",
        },
        {
            title: "User Journal",
            description: "Track your daily mood swings and thoughts in your personal journal. Reflect on your mindfulness journey, set goals, and monitor progress towards achieving mental clarity and emotional balance.",
            subDescription: "Maintain a personal journal to support and enhance your mindfulness practice.",
            image: journalImage,
            aos: "fade-left",
        },
    ];

    return (
            <div className="w-full font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200">

            <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 ">
                <div className="flex flex-wrap justify-center items-center mt-16">
                    <div className="w-full md:w-2/5 md:order-2  px-4 md:px-8 ">
                        <video autoPlay loop muted className="rounded-3xl w-full h-auto">
                            <source src={meditationVideo} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <section className="w-full md:w-3/5 text-left py-20 px-4 md:px-8 rounded-3xl md:order-1">
                        <h1 className="text-4xl font-bold mb-6">Calm Essence</h1>
                        <p className="text-2xl mb-4">Enhancing Your Mental Well-being with Our Comprehensive Mindfulness
                            Application</p>
                        <p className="text-xl mb-8">Explore our diverse meditation options tailored to your specific
                            needs, whether you&apos;re seeking relaxation, focus, improved sleep, or emotional balance. Each
                            meditation is designed to address your unique requirements and promote overall
                            well-being.</p>
                        <button onClick={() => window.location.href = "/signup"}
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                            Get Started
                        </button>
                    </section>
                </div>

                <section id="features" className="py-20">
                    <div className="mx-auto space-y-16">
                        {features.map((feature, index) => (
                            <div key={index}
                                 className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                 data-aos={feature.aos}>
                                <div className="md:w-1/2 flex justify-center">
                                    <img src={feature.image} alt={feature.title} className="h-96 rounded"/>
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <h3 className="text-4xl font-bold leading-tight sm:text-2xl md:text-4xl mb-4">{feature.title}</h3>
                                    <p className="mb-4">{feature.description}</p>
                                    <p className="mb-4">{feature.subDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <footer className="bg-gray-800 text-white py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center">
                <p>&copy; 2024 CalmEssence. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;

```
In this Landing Page component, create the application's intro page with the app's features using React components and styling with Tailwind CSS.

### ContactUs.jsx

```
import  { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contactImage from '../assets/contact-us.png';


const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const showToast = (message) => {
        toast.success(message);
    };

    const handleError = (message) => {
        toast.error(message);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isValid = email === "testemail@dal.ca";
            if (isValid) {
                showToast('Message sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                handleError('Failed to submit request. Please try again.');
            }
        } catch (error) {
            handleError('Failed to submit request. Please try again.');
        }
    };

    return (
        <div >
            <ToastContainer />
            <div className="w-full min-h-screen flex justify-center items-start p-4 pt-8 bg-gradient-to-b from-base-200 to-base-200">
            
                <div
                    className="w-full px-3 py-2 flex flex-col lg:flex-row items-center overflow-y-auto">

                    <div className="w-full lg:w-1/2 mb-4 lg:m-r4  flex justify-center items-center">
                            <img src={contactImage} alt="Decorative" className="w-10/12 object-cover"/>
                    </div>


                    <div className="w-full lg:w-1/2 px-8 md:px-16 m-8 md:m-16 items-center">
                        <div className="mx-auto p-2 bg-white rounded-3xl shadow-2xl">
                            <h2 className="text-2xl font-bold text-center mt-8 mb-8 ">Have a Question? Contact Us!</h2>

                            <form className="p-6" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name"
                                           className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email"
                                           className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                                        placeholder="testemail@dal.ca"
                                        required
                                    />
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="message"
                                           className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                                    <textarea
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 h-32"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-center mt-4 mb-2">
                                    <button
                                        type="submit"
                                        className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;


```
This component contains the Contact Us page with a form implemented using React and Tailwind CSS components.

### FAQs.jsx

```
import  { useState } from 'react';
import PropTypes from 'prop-types';
import faqImage from '../assets/faqs.png';

const faqData = [
    {
        question: 'What is Calm Essence and how can it help me?',
        answer: 'Calm Essence is a comprehensive mindfulness application designed to enhance your mental well-being. It offers features like meditation listings, guided sessions, breathing exercises, live expert sessions, chat support, and a journaling tool, all aimed at promoting a calmer, more focused, and stress-free life.',
    },
    {
        question: 'What are the main benefits of using Calm Essence?',
        answer: 'Using Calm Essence, you can access proven mindfulness techniques for managing stress and anxiety, participate in expert-led live sessions to learn new mindfulness practices, engage with a supportive community, navigate through an intuitive interface, and track your progress with a journaling tool—all contributing to improved mental well-being.',
    },
    {
        question: 'How can I find specific meditation options on Calm Essence?',
        answer: 'Calm Essence offers a diverse range of meditation options tailored to your needs, whether you seek relaxation, improved focus, better sleep, or emotional balance. You can explore these options through a comprehensive listing and use filters to find meditations that suit your preferences.',
    },
    {
        question: 'Can I participate in live sessions with mindfulness experts?',
        answer: 'Yes, Calm Essence allows you to engage in real-time live sessions led by mindfulness professionals. These sessions include guided meditations, and valuable insights providing a fulfilling experience from the comfort of your own space.',
    },
    {
        question: 'How does the journaling tool in Calm Essence work?',
        answer: 'The journaling tool in Calm Essence enables you to document your mindfulness journey, track mood fluctuations, and reflect on your thoughts. It helps you stay motivated and self-aware as you monitor your progress over time, fostering a deeper understanding of your mental and emotional well-being.',
    },
    {
        question: 'Is my data secure on Calm Essence?',
        answer: 'Absolutely. Calm Essence ensures a safe and trusted environment through robust authentication processes. Your data is protected as you engage in your spiritual wellness journey, facilitating meaningful interactions and mutual support among community members.',
    },
    {
        question: 'How can I get support from mindfulness experts on Calm Essence?',
        answer: 'Calm Essence offers convenient chat support where you can directly interact with mindfulness experts. Whether you have questions about meditation techniques, need personalized guidance, or seek encouragement, our experts are available to assist you through tailored advice and support.',
    },
    {
        question: 'Can I access Calm Essence across different devices?',
        answer: 'Yes, Calm Essence is designed to be accessible across various devices. Whether you prefer to use it on your desktop, tablet, or smartphone, you can enjoy seamless navigation and access to all features, ensuring a consistent mindfulness experience wherever you are.',
    }
];


const FAQItem = ({ faq, index, toggleFAQ }) => {
    return (
        <div className="border-b border-gray-200">
            <div
                className="cursor-pointer pt-4 pb-2 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
            >
                <h4 className={`text-lg font-semibold ${faq.open ? 'text-purple-500' : 'text-gray-800'}`}>
                    {faq.question}
                </h4>
                <span className={`transform transition-transform duration-300 ${faq.open ? 'rotate-180' : ''}`}>
          &#x25BC;
        </span>
            </div>
            <div className={`overflow-hidden transition-max-height duration-500 ${faq.open ? 'max-h-screen' : 'max-h-0'}`}>
                <p className="pt-1 pb-6  text-gray-600">{faq.answer}</p>
            </div>
        </div>
    );
};

FAQItem.propTypes = {
    faq: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    toggleFAQ: PropTypes.func.isRequired,
};

const FAQs = () => {
    const [faqs, setFaqs] = useState(faqData.map(faq => ({ ...faq, open: false })));

    const toggleFAQ = index => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open;
            } else {
                faq.open = false;
            }
            return faq;
        }));
    };

    return (
        <div className="min-h-screen flex justify-center items-start p-4 pt-24 bg-gradient-to-b from-base-200 to-base-200">
            <div className="bg-white rounded-2xl items-center shadow-lg p-8 w-full sm:mx-8 md:mx-40 lg:60 xl:60 h-full">
                <div className="py-4 w-full sm:w-1/2 items-center sm:mx-8 md:mx-40 lg:mx-60 xl:mx-60 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-4">
                        Calm Essence is your all-in-one mindfulness app which helps you to enhance your mental
                        well-being with ease and community support.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row h-full">
                    <div className="order-2 md:order-1 md:w-2/3 h-full">

                        <div className="overflow-y-auto h-3/4">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} faq={faq} index={index} toggleFAQ={toggleFAQ}/>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 md:order-2 md:w-1/2 mb-8 md:mb-0 md:ml-8 flex justify-center items-center">
                        <img src={faqImage} alt="Decorative" className="object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FAQs;

```
This component only has a simple card that displays FAQs with an expandable view to show the questions and answers.

### CSS files

```    
/*** tailwind.config.js **/
module.exports = {
  content:['./index.html', './src/**/*.{vue,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Poppins"', "sans-serif"],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


```
The CSS provided above is utilized to define the theme and styling elements for the application, including fonts.


### References

[1]   "Communication illustrations by Storyset" Storyset. [Online]. Available at: https://storyset.com/communication  [Accessed: 04 June 2024]

[2]   "Organic flat people meditating illustration" Freepik. [Online]. Available at: https://www.freepik.com/free-vector/organic-flat-people-meditating-illustration_13297285.htm#fromView=search&page=1&position=1&uuid=60509726-2f54-402f-8f8c-5dc19f8c1a22 [Accessed: 04 June 2024]

[3]    "Meditation Illustration Animation" Dribble. [Online]. Available at: https://dribbble.com/shots/16263763-Meditation-Illustration-Animation

[4]   "Image by Pietro Merola from Pixabay." Pixabay. [Online]. Available at: https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7986102

[5]   "Image by retrateapr from Pixabay." Pixabay. [Online]. Available at: https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7354363

[6]   "Influencer recording new video" Freepik. [Online]. Available at: https://www.freepik.com/free-vector/influencer-recording-new-video_7815291.htm#fromView=search&page=1&position=4&uuid=9db2ca83-a839-4726-8a74-07a8c1edf768 [Accessed: 04 June 2024]

[7]   "Happy women stand on floor and meditating in yoga pose by svstudioart on Freepik." Freepik. [Online]. Available at: https://www.freepik.com/free-vector/happy-women-stand-floor-meditating-yoga-pose_15620861.htm#fromView=search&page=1&position=21&uuid=10ae15ae-c0a9-4689-aaa3-bbc3e657c242 [Accessed: 04 June 2024]

[8]   "Breathing exercise concept illustration by storyset on Freepik." Freepik. [Online]. Available at: https://www.freepik.com/free-vector/breathing-exercise-concept-illustration_28205234.htm#fromView=search&page=1&position=29&uuid=10ae15ae-c0a9-4689-aaa3-bbc3e657c242 [Accessed: 04 June 2024]

[9]   "Woman expressing strong various feelings and emotions by pch.vector on Freepik." Freepik. [Online]. Available at: https://www.freepik.com/free-vector/woman-expressing-strong-various-feelings-emotions_8271103.htm#fromView=search&page=1&position=4&uuid=8f401dc4-4677-45f9-aaa1-1cb40a7cf1c3 [Accessed: 04 June 2024]

[10]  "Flat business person meditating by Freepik." Freepik. [Online]. Available at: https://www.freepik.com/free-vector/flat-business-person-meditating_13404878.htm#fromView=search&page=1&position=25&uuid=58fea7b1-5bf7-4b3c-9c9f-ed5d777d1dfa [Accessed: 04 June 2024]

[11]  "Customer support illustration by Freepik." Freepik. [Online]. Available at: https://www.freepik.com/free-vector/customer-support-illustration_12981630.htm#query=contact%20us&position=7&from_view=keyword&track=ais_user&uuid=4d84bf99-6e3e-4f5d-a87c-8f90319273d4 [Accessed: 04 June 2024]

[12]  "Flat design illustration customer support by Freepik." Freepik. [Online]. Available at: https://www.freepik.com/free-vector/flat-design-illustration-customer-support_12982910.htm#from_view=detail_alsolike [Accessed: 04 June 2024]

## Acknowledgments

* The code offered valuable insights, laying the groundwork for understanding the functionality and logic of several UI components. We are grateful for their work and dedication.
* It provided valuable insights and influenced my approach in understanding and learning the approaches and specific techniques. Their contribution is highly appreciated.