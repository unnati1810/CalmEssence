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
        <div className="min-h-screen flex justify-center items-start p-4 pt-24 bg-gradient-to-b from-purple-50 to-purple-100">
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
