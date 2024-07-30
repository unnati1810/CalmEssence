// Author: Rameez Parkar

import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';

const MeditationPlay = () => {
    const { id } = useParams();
    const [selectedSession, setSelectedSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSelectedSessionData();
    }, [id]);

    const fetchSelectedSessionData = async () => {
        setLoading(true);
        try {
            const dataUrl = `https://libraryitems.insighttimer.com/${id}/data/libraryitem.json`;
            const response = await axios.get(dataUrl);
            setSelectedSession(response.data);
        } catch (error) {
            console.error("Error fetching session data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!selectedSession) {
        return <div className="min-h-screen flex items-center justify-center">Session not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-50 to-purple-100">
            <div className="w-full">
                <div className="w-full h-[30vh] md:h-[45vh] lg:h-[60vh]">
                    {selectedSession && (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=QHkXvPq2pQE`}
                            controls
                            width="100%"
                            height="100%"
                        />
                    )}
                </div>
                <div className='p-4'>
                    <h2 className="text-2xl font-bold mt-6 mb-4">{selectedSession.title}</h2>
                    <div className="mb-4">
                        <p className="text-lg text-gray-800"><strong>Author:</strong> {selectedSession.publisher.name}</p>
                        <p className="text-lg text-gray-800"><strong>Rating:</strong> {selectedSession.rating_score} stars</p>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedSession.long_description}</p>
                </div>
            </div>
        </div>
    );
};

export default MeditationPlay;
