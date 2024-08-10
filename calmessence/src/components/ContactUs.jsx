import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contactImage from '../assets/contact-us.png';
import axios from 'axios';

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
            const response = await axios.post('https://csci-5709-group8.onrender.com/api/sessions/contact-us', {
                name,
                email,
                message,
            });

            console.log(response);
            if (response.status === 200) {
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
        <div>
            <div className="w-full min-h-screen flex justify-center items-start p-4 pt-8 bg-gradient-to-b from-base-200 to-base-200">
                <div className="w-full px-3 py-2 flex flex-col lg:flex-row items-center overflow-y-auto">
                    <div className="w-full lg:w-1/2 mb-4 lg:m-r4  flex justify-center items-center">
                        <img src={contactImage} alt="Decorative" className="w-10/12 object-cover" />
                    </div>

                    <div className="w-full lg:w-1/2 px-8 md:px-16 m-8 md:m-16 items-center">
                        <div className="mx-auto p-2 bg-white rounded-3xl shadow-2xl">
                            <h2 className="text-2xl font-bold text-center mt-8 mb-8">Have a Question? Contact Us!</h2>

                            <form className="p-6" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-base-100"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-base-100"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-8">
                                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
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
                                        className="w-full px-3 py-2 text-white bg-zinc-950 hover:bg-base-200 hover:text-black font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-base-200 focus:ring-opacity-50"
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
