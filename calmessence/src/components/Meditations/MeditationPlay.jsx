import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

const MeditationPlay = () => {
    const { id } = useParams();
    const [selectedSession, setSelectedSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSelectedSessionData();
    }, []);

    const fetchSelectedSessionData = async () => {
        setLoading(true);
        const dataUrl = `https://libraryitems.insighttimer.com/${id}/data/libraryitem.json`;
        let response = await axios.get(dataUrl);
        console.log(response.data);
        setSelectedSession(response.data);
        setLoading(false);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!selectedSession) {
        return <div className="min-h-screen flex items-center justify-center">Session not found</div>;
    }

    // const fetchSelectedSessionData = async () => {
    //     const dataUrl = `https://libraryitems.insighttimer.com/${id}/data/libraryitem.json`;
    //     let session = await axios.get(dataUrl);
    //     console.log(session);
    //     setSelectedSession(session);
    // };

    return (
        <div className="min-h-screen flex flex-col items-center p-4 pt-12 bg-gradient-to-b from-purple-50 to-purple-100">
            <div className="w-full max-w-4xl p-8 bg-white rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">{selectedSession.title}</h2>
                <div className="mb-4">
                    <p className="text-lg text-gray-800"><strong>Author:</strong> {selectedSession.publisher.name}</p>
                    <p className="text-lg text-gray-800"><strong>Rating:</strong> {selectedSession.rating_score}</p>
                </div>
                <p className="text-gray-700 mb-4">{selectedSession.long_description}</p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    {selectedSession.preview_media_paths[0] && (
                        <div className="w-full md:w-1/2">
                            <video
                                src={`https://libraryitems.insighttimer.com/y5h2j5m5v4w4j3b9a1d7c9u5q6q2k3n2s3j3l0s3/hls/v1/y5h2j5m5v4w4j3b9a1d7c9u5q6q2k3n2s3j3l0s3_000.ts`}
                                controls
                                className="w-full h-auto rounded-lg shadow-lg"
                                onError={(e) => console.error('Error loading video:', e)}
                            />
                        </div>
                    )}
                    {selectedSession.preview_media_paths[0] && (
                        <div className="w-full md:w-1/2">
                            <audio
                                src={selectedSession.preview_media_paths[0]}
                                controls
                                className="w-full"
                                onError={(e) => console.error('Error loading audio:', e)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MeditationPlay;
