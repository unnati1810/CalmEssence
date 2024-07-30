import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Adjust import path as necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"; // Import Toastify CSS

const CreateBreathingExercise = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [image, setImage] = useState('');
    const [textContent, setTextContent] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [contentUrl, setContentUrl] = useState('');
    const [loading, setLoading] = useState(false); // State for loader
    const navigate = useNavigate();

    const { user } = useAuth(); // Get user data from context

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Prepare breathing exercise data with auto-assigned user fields
        const breathingExercise = {
            title,
            description,
            duration,
            image,
            text_content: textContent,
            media_type: mediaType,
            content_url: contentUrl,
            user_id: user.id,
            user_name: user.email, // You might want to use user.email or user.name
            user_email: user.email,
        };

        setLoading(true); // Show loader

        try {
            const response = await axios.post('https://csci-5709-group8.onrender.com/api/breathing/create', breathingExercise);
            console.log('Breathing exercise created successfully:', response.data);
            toast.success('Breathing exercise created successfully!');
            // Clear the form after successful submission
            setTitle('');
            setDescription('');
            setDuration('');
            setImage('');
            setTextContent('');
            setMediaType('');
            setContentUrl('');
            navigate('/breathing');

        } catch (error) {
            console.error('Error creating breathing exercise:', error);
            toast.error('Error creating breathing exercise. Please try again.');
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className="w-full min-h-screen font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 p-4 sm:p-4 md:p-8 lg:p-10 xl:p-16">
            <div className="font-bold text-black text-xl ml-8 truncate">Create Breathing Exercise</div>
            <div className="flex flex-col md:flex-row justify-center m-8 space-y-8 md:space-y-0 md:space-x-8">
                <div className="w-full md:w-1/2 p-8 bg-white rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                    <form className="space-y-4" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="title" className="block mb-1">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="w-full border rounded px-3 py-2"
                                maxLength="30"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-1">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                className="w-full border rounded px-3 py-2"
                                maxLength="150"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="duration" className="block mb-1">Duration (in minutes):</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                className="w-full border rounded px-3 py-2"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block mb-1">Image URL:</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className="w-full border rounded px-3 py-2"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="textContent" className="block mb-1">Text Content:</label>
                            <textarea
                                id="textContent"
                                name="textContent"
                                rows="4"
                                className="w-full border rounded px-3 py-2"
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="mediaType" className="block mb-1">Media Type:</label>
                            <select
                                id="mediaType"
                                name="mediaType"
                                className="w-full border rounded px-3 py-2"
                                value={mediaType}
                                onChange={(e) => setMediaType(e.target.value)}
                                required
                            >
                                <option value="">Select media type</option>
                                <option value="audio">Audio</option>
                                <option value="video">Video</option>
                                <option value="text">Text</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="contentUrl" className="block mb-1">Content URL:</label>
                            <input
                                type="text"
                                id="contentUrl"
                                name="contentUrl"
                                className="w-full border rounded px-3 py-2"
                                value={contentUrl}
                                onChange={(e) => setContentUrl(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-zinc-950 hover:bg-base-300 hover:text-black text-white font-bold py-2 px-4 rounded"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? 'Submitting...' : 'Submit'} {/* Show loader text */}
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center order-1 md:order-2">
                    <div className="p-2 bg-opacity-70 bg-backgroundColor rounded-xl">
                        <h2 className="text-s font-extrabold mb-6">Follow These Simple Steps</h2>
                        <ol className="list-decimal pl-4">
                            <li className="mb-2">Step 1: Fill in the title field (max 30 characters).</li>
                            <li className="mb-2">Step 2: Provide a description (max 150 characters).</li>
                            <li className="mb-2">Step 3: Specify the duration in minutes.</li>
                            <li className="mb-2">Step 4: (Optional) Provide an image URL.</li>
                            <li className="mb-2">Step 5: (Optional) Add text content.</li>
                            <li className="mb-2">Step 6: Select the media type.</li>
                            <li className="mb-2">Step 7: (Optional) Provide a content URL.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBreathingExercise;
