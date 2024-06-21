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
            <div className="font-sans antialiased text-gray-900 bg-gradient-to-b from-purple-50 to-purple-100">

            <div className=" px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 ">
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
                                className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Get Started
                        </button>
                    </section>
                </div>

                <section id="features" className="py-20">
                    <div className="container mx-auto space-y-16">
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
