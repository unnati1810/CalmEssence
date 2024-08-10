const LiveSessionItemCard = ({ session, onEdit, onStart, user }) => {
    const formattedDate = new Date(session.session_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = new Date(`1970-01-01T${session.session_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if the user is the expert for this session
    const isCurrentUserExpert = session.expert_id == user.id;

    return (
        <div className="relative max-w-sm bg-white rounded-xl overflow-hidden shadow-lg">
            {isCurrentUserExpert && (
                <div className="absolute top-1 right-1 bg-gray-300 text-black text-xs font-semibold py-1 px-3 rounded-xl shadow-md">
                    You
                </div>
            )}
            <div className="p-6 pt-8 flex flex-col h-full">
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
                        className="bg-gray-200 text-black text-sm flex-1 mx-0.5 py-2 px-4 rounded hover:bg-gray-300"
                        onClick={() => onStart(session)}
                    >
                        Start
                    </button>
                    {isCurrentUserExpert && (
                        <button
                            className="bg-base-100 hover:bg-base-200 text-black text-sm flex-1 me-1 py-2 px-4 rounded"                            onClick={() => onEdit(session)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveSessionItemCard;
