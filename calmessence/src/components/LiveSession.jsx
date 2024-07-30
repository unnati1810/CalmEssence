import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LiveSessionItemCard from "./LiveSessionItemCard";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useAuth } from '../AuthContext'; // Adjust import path as necessary

const pageSize = 5;

function LiveSession() {
    const [sessionsList, setSessionsList] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [sessionLength, setSessionLength] = useState('30');
    const [sessionDate, setSessionDate] = useState('');
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchSessions(1); // Fetch the first page initially
    }, []);

    const fetchSessions = async (page) => {
        setFetching(true);
        try {
            const response = await fetch(`https://csci-5709-group8.onrender.com/api/sessions/list?page=${page}&pageSize=${pageSize}`);
            const result = await response.json();
            setSessionsList(result.data);
            setPagination(result.pagination);
        } catch (error) {
            console.error('Error fetching sessions:', error);
            toast.error('Error fetching sessions!');
        }
        setFetching(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const selectedDateTime = new Date(sessionDate);
        selectedDateTime.setHours(Number(sessionTime.split(':')[0]));
        selectedDateTime.setMinutes(Number(sessionTime.split(':')[1]));

        if (selectedDateTime < currentDate) {
            toast.error('Selected date and time cannot be in the past.');
            return;
        }

        const requestPayload = {
            title,
            description,
            session_date: sessionDate,
            session_time: sessionTime,
            duration: sessionLength,
            expert_id: user.id,
            expert_email: user.email, // You might want to use user.email or user.name
            // expert_id: "expert-123", // Replace with actual expert ID
            // expert_email: "nikul@example.com" // Replace with actual expert email
        };

        setSubmitting(true);
        try {
            if (selectedSessionId !== null) {
                // Update session
                const updatePayload = {
                    session_id: selectedSessionId,
                    title,
                    description,
                    session_date: sessionDate,
                    session_time: sessionTime,
                    actual_start_time: new Date().toISOString(),
                    duration: sessionLength,
                    status: "started"
                };
                await fetch('https://csci-5709-group8.onrender.com/api/sessions/edit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatePayload)
                });
                toast.success('Session updated successfully!');
            } else {
                // Create new session
                await fetch('https://csci-5709-group8.onrender.com/api/sessions/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestPayload)
                });
                toast.success('Session created successfully!');
            }
            // Refresh session list after update or creation
            fetchSessions(pagination.page);
            setTitle('');
            setDescription('');
            setSessionDate('');
            setSessionTime('');
            setSessionLength('30');
            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form!');
        }
        setSubmitting(false);
    };

    const handleEditSession = (session) => {
        setTitle(session.title);
        setDescription(session.description);
        setSessionDate(new Date(session.session_date).toISOString().split('T')[0]); // Convert date to YYYY-MM-DD
        setSessionTime(session.session_time);
        setSelectedSessionId(session.session_id);
    };

    const handleStartButtonClick = (session) => {
        navigate('/videoCall', {
            state: {
                session,
                loggedInUserId: user.id,
                user_email: user.email
            }
        });
    };

    const handlePageChange = (direction) => {
        const newPage = direction === 'next' ? pagination.page + 1 : pagination.page - 1;
        fetchSessions(newPage);
    };

    return (
        <div
            className="w-full min-h-screen font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <div className="flex justify-between items-center mb-6">
                <div className="font-bold text-black text-xl truncate">Scheduled Session</div>
                <div className="flex items-center">
                    <button
                        className="btn btn-primary mr-2"
                        disabled={pagination.page === 1 || fetching}
                        onClick={() => handlePageChange('prev')}
                    >
                        Previous
                    </button>
                    <span>Page {pagination.page} of {pagination.totalPages}</span>
                    <button
                        className="btn btn-primary ml-2"
                        disabled={pagination.page === pagination.totalPages || fetching}
                        onClick={() => handlePageChange('next')}
                    >
                        Next
                    </button>
                </div>
            </div>

            {fetching ? (
                <Loader/>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {sessionsList.map((session) => (
                            <LiveSessionItemCard
                                key={session.session_id}
                                session={session}
                                onEdit={handleEditSession}
                                onStart={handleStartButtonClick}
                            />
                        ))}
                    </div>

                    <div className="font-bold text-black text-xl mt-8 truncate">Create Session</div>

                    <div className="flex flex-col md:flex-row justify-center mt-8 space-y-8 md:space-y-0 md:space-x-8">
                        <div
                            className="w-full md:w-1/2 p-8 bg-white rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
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
                                <div className="flex">
                                    <div className="flex-1 me-2">
                                        <label htmlFor="sessionDate" className="block mb-1">Session Date:</label>
                                        <input
                                            type="date"
                                            id="sessionDate"
                                            name="sessionDate"
                                            className="w-full border rounded px-3 py-2"
                                            value={sessionDate}
                                            onChange={(e) => setSessionDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="sessionTime" className="block mb-1">Session Time:</label>
                                        <input
                                            type="time"
                                            id="sessionTime"
                                            name="sessionTime"
                                            className="w-full border rounded px-3 py-2"
                                            value={sessionTime}
                                            onChange={(e) => setSessionTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="sessionLength" className="block mb-1">Session Length:</label>
                                    <select
                                        id="sessionLength"
                                        name="sessionLength"
                                        className="w-full border rounded px-3 py-2"
                                        value={sessionLength}
                                        onChange={(e) => setSessionLength(e.target.value)}
                                        required
                                    >
                                        <option value="">Select length</option>
                                        <option value="30">30 minutes</option>
                                        <option value="45">45 minutes</option>
                                        <option value="60">60 minutes</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-black text-white rounded-full py-2 px-4 shadow-md hover:bg-gray-800 transition duration-300 flex items-center justify-center"
                                    disabled={submitting}
                                >
                                    {submitting ? <Loader/> : 'Create Session'}
                                </button>
                            </form>
                        </div>
                        <div
                            className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center order-1 md:order-2">
                            <div className="p-10 bg-opacity-70 bg-backgroundColor rounded-xl">
                                <h2 className="text-s font-extrabold mb-6">Follow These Simple Steps</h2>
                                <ol className="list-decimal pl-4">
                                    <li className="mb-2">Step 1: Fill in the title field (max 30 characters).</li>
                                    <li className="mb-2">Step 2: Fill in the description field (max 150 characters).</li>
                                    <li className="mb-2">Step 3: Select a date from the calendar.</li>
                                    <li className="mb-2">Step 4: Select a time.</li>
                                    <li className="mb-2">Step 5: Choose the duration (30, 45, or 60 minutes).</li>
                                    <li className="mb-2">Step 6: Click Submit.</li>
                                </ol>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
}

export default LiveSession;
