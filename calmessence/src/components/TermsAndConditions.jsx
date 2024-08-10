import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TermsAndConditions = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="w-full bg-gradient-to-b from-base-200 to-base-300 font-poppins text-gray-900">
            <section className="px-6 py-12 lg:px-20 lg:py-20">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-bold text-center mb-12" data-aos="fade-up">
                        Terms and Conditions
                    </h1>
                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p data-aos="fade-up">
                            Welcome to Calm Essence. These Terms and Conditions govern your use of our application and services. By accessing or using Calm Essence, you agree to comply with these terms. Please read them carefully.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            User Accounts
                        </h2>
                        <p data-aos="fade-up">
                            To access certain features of Calm Essence, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Acceptable Use
                        </h2>
                        <p data-aos="fade-up">
                            You agree not to use Calm Essence for any unlawful or prohibited activities. You must not misuse our app, attempt to gain unauthorized access, or transmit any harmful content. We reserve the right to terminate your account for any violations.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Intellectual Property
                        </h2>
                        <p data-aos="fade-up">
                            All content, including text, images, graphics, and software, is the property of Calm Essence or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit consent.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Limitation of Liability
                        </h2>
                        <p data-aos="fade-up">
                            Calm Essence is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee that the app will be error-free, and we are not liable for any damages arising from your use of the app.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Modifications to Terms
                        </h2>
                        <p data-aos="fade-up">
                            We may update these Terms and Conditions at any time. Your continued use of Calm Essence after any changes constitutes acceptance of the new terms. It is your responsibility to review these terms periodically.
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Governing Law
                        </h2>
                        <p data-aos="fade-up">
                            These Terms and Conditions are governed by the laws of [Your Jurisdiction]. Any disputes arising out of or related to these terms will be resolved in the courts of [Your Jurisdiction].
                        </p>
                        <h2 className="text-3xl font-semibold mt-8 mb-4" data-aos="fade-up">
                            Contact Us
                        </h2>
                        <p data-aos="fade-up">
                            If you have any questions or concerns about these Terms and Conditions, please contact us at support@calmessence.com.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;
