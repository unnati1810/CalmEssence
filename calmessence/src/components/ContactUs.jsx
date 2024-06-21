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
            <div className="min-h-screen flex justify-center items-start p-4 pt-8 bg-gradient-to-b from-purple-50 to-purple-100">
            
                <div
                    className="w-full px-3 py-2 flex flex-col lg:flex-row items-center overflow-y-auto">

                    <div className="w-full lg:w-1/2 mb-4 lg:m-r4  flex justify-center items-center">
                        {/* <div className="bg-white bg-opacity-10 m-16 p-8 rounded-xl shadow-2xl">
                            <p className="text-gray-700 text-lg mb-4">
                                At CalmEssence, we are committed to providing exceptional support and guidance to our
                                clients. Here’s how we can help you:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-lg">
                                <li>Expert advice and personalized assistance.</li>
                                <li>Timely responses and quick resolution to your queries.</li>
                                <li>Comprehensive resources to enhance your experience.</li>
                                <li>Continuous improvement based on your feedback.</li>
                            </ul>
                        </div> */}
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
