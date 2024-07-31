import { useEffect, useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Editor from "./Editor";
import Cover from "./Cover";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useAuth } from '../AuthContext'; // Adjust import path as necessary

export default function Page() {
    const initialData = useLocation().state;
    const coverUrl = useState('https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const [blocks, setBlocks] = useState([]);
    const [title, setTitle] = useState(initialData ? initialData.content.title : '');
    // const [HTML, setHTML] = useState();
    const blocksUpdateTimeout = useRef(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async () => {
        setTimeout(() => {
            navigate('/journal');
        }, 2000)
    }

    useEffect(() => {
        clearTimeout(blocksUpdateTimeout.current);
        blocksUpdateTimeout.current = setTimeout(async () => {
            const content = { title, body: blocks, user: user.id};

            try {
                // use fetch instead of axios
                const response = await fetch('https://csci-5709-group8.onrender.com/api/blogs/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(content)
                });
                console.log(response);
            } catch (error) {
                console.log('update failed')

                console.log(error);
            }
        }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocks, title]);

    return (
        <main className="min-h-screen">
            <Cover url={coverUrl} />
            <div className="flex flex-col px-24 py-10 w-full">
                <TextareaAutosize
                    value={title}
                    onChange={(e) => { e.preventDefault(); setTitle(e.target.value)}}
                    placeholder="Type something..."
                    className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none" 
                />
                <Editor onChange={setBlocks} initialData={initialData} />
                <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Publish
                </button>
            </div>
        </main>
    )
}