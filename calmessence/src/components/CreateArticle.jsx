import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Adjust import path as necessary
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [contentHtml, setContentHtml] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        // Prepare article data with auto-assigned user fields
        const article = {
            title,
            content_html: contentHtml,
            image,
            user_id: user.id,
            user_name: user.email, // You might want to use user.email or user.name
            user_email: user.email,
            tags
        };

        try {
            const response = await axios.post('https://csci-5709-group8.onrender.com/api/articles/create', article);
            console.log('Article created successfully:', response.data);
            toast.success('Article created successfully!'); // Show success toast
            // Clear the form after successful submission
            setTitle('');
            setContentHtml('');
            setImage('');
            setTags('');
            navigate('/articles'); // Redirect to articles page
        } catch (error) {
            console.error('Error creating article:', error);
            toast.error('Error creating article. Please try again.'); // Show error toast
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };

    return (
        <div className="w-full min-h-screen font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 p-4 sm:p-4 md:p-8 lg:p-10 xl:p-16">

            <div className="font-bold text-black text-xl ml-8 truncate">Create Article</div>
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
                            className="w-full bg-zinc-950 hover:bg-base-300 hover:text-black text-white font-bold py-2 px-4 rounded"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? 'Submitting...' : 'Submit'} {/* Show loader text */}
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
                            <li className="mb-2">Step 4: (Optional) Add tags (comma-separated).</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateArticle;
