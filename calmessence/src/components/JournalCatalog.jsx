import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Catalog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://csci-5709-group8.onrender.com/api/blogs/all');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-full gap-y-4 justify-center items-center my-8">
            {blogs.map((blog, i) => (
                <div key={i} className="max-w-xl w-full lg:max-w-2xl lg:flex">
                    <div className="h-96 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}} title="Woman holding a mug">
                    </div>
                    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <div className="text-gray-900 font-bold text-xl mb-2">{blog.title}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-sm">
                                <p className="text-gray-900 leading-none">{blog.user}</p>
                            </div>
                        </div>
                    <button onClick={() => { console.log('meow', blog.body), navigate('/page', {state: {
                        content: blog
                    }} ) }} className="bg-blue-500 w-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-4">
                        Read
                    </button>
                    </div>
                </div>
            ))}
                <button
                    className="fixed bottom-10 right-10 bg-zinc-950 text-white rounded-full p-4 shadow-lg hover:bg-base-300 hover:text-black transition duration-300 z-10"
                    onClick={() => navigate('/page')}
                >
                    <span className="ml-2">Create Page</span>
                </button>
        </div>
    );
};

export default Catalog;