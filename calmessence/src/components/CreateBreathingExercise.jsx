import  { useState } from 'react';
import axios from 'axios';

const CreateBreathingExercise = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [image, setImage] = useState('');
    const [textContent, setTextContent] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [contentUrl, setContentUrl] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const breathingExercise = {
            title,
            description,
            duration,
            image,
            text_content: textContent,
            media_type: mediaType,
            content_url: contentUrl,
            user_id: userId,
            user_name: userName,
            user_email: userEmail
        };

        try {
            const response = await axios.post('https://csci-5709-group8.onrender.com/api/breathing/create', breathingExercise);
            console.log('Breathing exercise created successfully:', response.data);
            // Clear the form after successful submission
            setTitle('');
            setDescription('');
            setDuration('');
            setImage('');
            setTextContent('');
            setMediaType('');
            setContentUrl('');
            setUserId('');
            setUserName('');
            setUserEmail('');
        } catch (error) {
            console.error('Error creating breathing exercise:', error);
        }
    };

    return (
        <div>
            <div className="font-bold text-white text-xl mt-8 truncate">Create Breathing Exercise</div>
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
                        <div>
                            <label htmlFor="userId" className="block mb-1">User ID:</label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                className="w-full border rounded px-3 py-2"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="userName" className="block mb-1">User Name:</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                className="w-full border rounded px-3 py-2"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="userEmail" className="block mb-1">User Email:</label>
                            <input
                                type="email"
                                id="userEmail"
                                name="userEmail"
                                className="w-full border rounded px-3 py-2"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{ backgroundColor: '#4CAF50', color: 'white' }}
                            className="w-full text-sm flex-1 py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center order-1 md:order-2">
                    <div className="p-2 bg-opacity-70 bg-backgroundColor rounded-xl">
                        <h2 className="text-s font-extrabold mb-6">Follow These Simple Steps</h2>
                        <ol className="list-decimal pl-4">
                            <li className="mb-2">Step 1: Fill in the title field (max 30 characters).</li>
                            <li className="mb-2">Step 2: Fill in the description (max 150 characters).</li>
                            <li className="mb-2">Step 3: Specify the duration in minutes.</li>
                            <li className="mb-2">Step 4: (Optional) Provide an image URL.</li>
                            <li className="mb-2">Step 5: (Optional) Add text content.</li>
                            <li className="mb-2">Step 6: Select the media type.</li>
                            <li className="mb-2">Step 7: (Optional) Provide a content URL.</li>
                            <li className="mb-2">Step 8: (Optional) Enter user ID, name, and email.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBreathingExercise;
