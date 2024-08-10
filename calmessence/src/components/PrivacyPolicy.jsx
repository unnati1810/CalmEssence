import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="w-full bg-gradient-to-b from-base-200 to-base-300 font-poppins text-gray-900">
            <section className="px-6 py-12 lg:px-20 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-12" data-aos="fade-up">
                        Privacy Policy
                    </h1>
                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p data-aos="fade-up">
                            Welcome to Calm Essence. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your information.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Information We Collect
                        </h2>
                        <p data-aos="fade-up">
                            We may collect personal information such as your name, email address, and usage data when you interact with our app. This data helps us improve your experience and provide you with personalized services.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            How We Use Your Information
                        </h2>
                        <p data-aos="fade-up">
                            The information we collect is used to enhance your experience with Calm Essence, provide customer support, and keep you informed about updates or new features. We may also use your data for analytics purposes to improve our app.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Sharing Your Information
                        </h2>
                        <p data-aos="fade-up">
                            We do not sell, trade, or share your personal information with third parties, except when required by law or to provide essential services. Any third-party services we use are bound by confidentiality agreements.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Data Security
                        </h2>
                        <p data-aos="fade-up">
                            We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Changes to This Policy
                        </h2>
                        <p data-aos="fade-up">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or the law. We will notify you of any significant changes through our app or by email.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Contact Us
                        </h2>
                        <p data-aos="fade-up">
                            If you have any questions or concerns about our Privacy Policy, please contact us at support@calmessence.com.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
