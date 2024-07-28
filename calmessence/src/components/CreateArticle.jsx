import  { useState } from 'react';
import axios from 'axios';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [contentHtml, setContentHtml] = useState('');
    const [image, setImage] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [tags, setTags] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const article = {
            title,
            content_html: contentHtml,
            image,
            user_id: userId,
            user_name: userName,
            user_email: userEmail,
            tags
        };

        try {
            const response = await axios.post('http://localhost:8080/api/articles/create', article);
            console.log('Article created successfully:', response.data);
            // Clear the form after successful submission
            setTitle('');
            setContentHtml('');
            setImage('');
            setUserId('');
            setUserName('');
            setUserEmail('');
            setTags('');
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div>
            <div className="font-bold text-white text-xl mt-8 truncate">Create Article</div>
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
                                maxLength="100"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contentHtml" className="block mb-1">Content (HTML):</label>
                            <textarea
                                id="contentHtml"
                                name="contentHtml"
                                rows="10"
                                className="w-full border rounded px-3 py-2"
                                value={contentHtml}
                                onChange={(e) => setContentHtml(e.target.value)}
                                required
                            ></textarea>
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
                        <div>
                            <label htmlFor="tags" className="block mb-1">Tags:</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                className="w-full border rounded px-3 py-2"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
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
                            <li className="mb-2">Step 1: Fill in the title field (max 100 characters).</li>
                            <li className="mb-2">Step 2: Enter the HTML content.</li>
                            <li className="mb-2">Step 3: (Optional) Provide an image URL.</li>
                            <li className="mb-2">Step 4: (Optional) Enter user ID, name, and email.</li>
                            <li className="mb-2">Step 5: (Optional) Add tags (comma-separated).</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateArticle;
