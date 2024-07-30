// Author: Rameez Parkar

import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import MeditationVideos from './meditation-videos';
import {getRandomInteger} from '../../utils/Utils';

const MeditationPlay = () => {
    const { id } = useParams();
    const [selectedSession, setSelectedSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoUrl, setVideoUrl] = useState(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchSelectedSessionData();
        setVideoUrl(MeditationVideos[getRandomInteger(0, MeditationVideos.length-1)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchSelectedSessionData = async () => {
        setLoading(true);
        try {
            const dataUrl = `https://libraryitems.insighttimer.com/${id}/data/libraryitem.json`;
            const response = await axios.get(dataUrl);
            setSelectedSession(response.data);
            const selectedTags = response.data.hashtags.map((item) => {
                return item.name;
            });
            setTags(selectedTags);
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
        <div className="min-h-screen flex flex-col items-center lg:p-8 bg-gradient-to-b from-base-200 to-base-200">
            <div className="w-full">
                <div className='bg-gradient-to-b from-base-200 to-base-200 flex justify-center'>
                    <div className="w-[426px] h-[240px] sm:w-[640px] sm:h-[360px] md:w-[854px] md:h-[480px] lg:w-[1280px] lg:h-[720px] bg-black">
                        {selectedSession && (
                            <ReactPlayer
                                url={videoUrl}
                                controls
                                width="100%"
                                height="100%"
                            />
                        )}
                    </div>
                </div>
                <div className='p-4 md:p-8'>
                    <h2 className="text-2xl font-bold mt-6 mb-4">{selectedSession.title}</h2>
                    <div className="mb-4">
                        <p className="text-lg text-gray-900"><strong>Author:</strong> {selectedSession.publisher.name}</p>
                        <p className="text-lg text-gray-900"><strong>Rating:</strong> {selectedSession.rating_score} stars</p>
                        <p className="text-lg text-gray-900"><strong>Content Type:</strong> {selectedSession.content_type}</p>
                        <p className="text-lg text-gray-900"><strong>Level:</strong> {selectedSession.level}</p>
                        <div className='flex flex-wrap'>
                            {
                                tags.map(tag => <p key={tag} className='bg-gray-300 p-4 my-3 mr-3 rounded-2xl'>{tag}</p>)
                            }
                        </div>
                    </div>
                    <p className="text-gray-900 mb-4">{selectedSession.long_description}</p>
                </div>
            </div>
        </div>
    );
};

export default MeditationPlay;
