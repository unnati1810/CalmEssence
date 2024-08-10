import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="w-full bg-gradient-to-b from-base-200 to-base-300 font-poppins text-gray-900">
            <section className="px-6 py-12 lg:px-20 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-12" data-aos="fade-up">
                        About Us
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8" data-aos="fade-up">
                        Welcome to Calm Essence, your companion on the journey to a calmer, more focused, and stress-free life. In today&apos;s fast-paced world, mental wellness has become more crucial than ever, and Calm Essence is here to support you every step of the way.
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8" data-aos="fade-up">
                        Our comprehensive mindfulness application is designed to help you cultivate mindfulness and improve your mental health through a range of features, including guided meditations, breathing exercises, live sessions with experts, chat support, and a journaling tool. Whether you are dealing with stress, anxiety, or simply looking to enhance your mental well-being, Calm Essence offers the tools you need to live a more balanced and fulfilling life.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                        <div data-aos="fade-right">
                            <h2 className="text-4xl font-semibold mb-4">Our Mission</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our mission is to make mental wellness accessible to everyone. We believe that with the right guidance and tools, anyone can achieve a state of calm, clarity, and happiness. By providing proven mindfulness techniques for stress and anxiety management, expert-led live sessions, and a supportive community, Calm Essence empowers individuals to take control of their mental health.
                            </p>
                        </div>
                        <div data-aos="fade-left">
                            <h2 className="text-4xl font-semibold mb-4">Our Vision</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We envision a world where mental well-being is prioritized, and everyone has the resources to manage their mental health effectively. Our goal is to foster a global community that supports and encourages mindfulness practices, helping individuals lead happier, healthier lives.
                            </p>
                        </div>
                    </div>
                    <div className="mt-16 text-center" data-aos="fade-up">
                        <h2 className="text-4xl font-semibold mb-6">Join Us on the Journey</h2>
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                            At Calm Essence, we are committed to providing you with the best resources and guidance for
                            your mindfulness journey. Together, we can create a world where mental wellness is a
                            priority and where every individual has the support they need to thrive.
                        </p>
                        <div className="flex justify-center items-center ">
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                                <button
                                    className="bg-zinc-950 hover:bg-base-300 hover:text-black text-white font-bold py-3 px-8 rounded-full transition duration-300"
                                    onClick={() => window.location.href = "/signup"}
                                >
                                    Get Started
                                </button>
                                <button
                                    className="bg-base-200 hover:bg-base-300 hover:text-black text-black font-bold py-3 px-8 rounded-full transition duration-300"
                                    onClick={() => window.location.href = "/terms"}
                                >
                                    Terms and Conditions
                                </button>
                                <button
                                    className="bg-base-200 hover:bg-base-300 hover:text-black text-black font-bold py-3 px-8 rounded-full transition duration-300"
                                    onClick={() => window.location.href = "/policy"}
                                >
                                    Privacy Policy
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
