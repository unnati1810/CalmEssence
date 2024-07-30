const LiveSessionItemCard = ({ session, onEdit, onStart }) => {
    // Format the session date and time
    const formattedDate = new Date(session.session_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = new Date(`1970-01-01T${session.session_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 flex flex-col h-full">
                <div className="font-bold text-xl mb-2 truncate">{session.title}</div>
                <p className="text-gray-700 text-base line-clamp-2">{session.description}</p>
                <div className="flex-grow"></div>
                <div className="flex items-center mt-2">
                    <div className="text-sm">
                        <p className="mt-1 text-sm text-gray-500">Time: <span className="time">{formattedTime}</span></p>
                        <p className="mt-1 text-sm text-gray-500">Day: <span className="date">{formattedDate}</span></p>
                        <p className="mt-1 text-sm text-gray-500">Duration: <span className="duration">{session.duration}</span></p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        className="bg-purple-500 hover:bg-purple-700 text-white  text-sm flex-1 me-1 py-2 px-4 rounded"
                        onClick={() => onStart(session)}
                    >
                        Start
                    </button>
                    <button
                        className="bg-gray-200 text-black text-sm flex-1 py-2 px-4 rounded hover:bg-gray-300"
                        onClick={() => onEdit(session)}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveSessionItemCard;
