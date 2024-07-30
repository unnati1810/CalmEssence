import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles.css";

export const LiveVideo = () => {
    const { state } = useLocation();
    const { session, loggedInUserId, user_email } = state || {};
    const navigate = useNavigate();

    const appId = 'e947c59bbe8c4287954cb154e63be817';
    const [calling, setCalling] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isConnected = useIsConnected();

    // Determine user role
    const isPublisher = loggedInUserId == session.expert_id;
    const role = isPublisher ? 'publisher' : 'subscriber';

    // Fetch the token from the API using session details
    useEffect(() => {
        const fetchToken = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://csci-5709-group8.onrender.com/api/tokens/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        channelName: session.agora_channel_id,
                        uid: loggedInUserId,
                        role: role,
                        expireTime: 3600,
                        user_email: user_email
                    })
                });
                const data = await response.json();
                setToken(data.token);
                setCalling(true);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching token:', error);
                setError('Error fetching token');
                setLoading(false);
            }
        };

        if (session.agora_channel_id && loggedInUserId) {
            fetchToken();
        }
    }, [session.agora_channel_id, loggedInUserId, role, user_email]);

    // Join the channel
    useJoin({ appid: appId, channel: session.agora_channel_id, token: token, uid: loggedInUserId }, calling);

    // Local video and audio tracks
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(isPublisher);
    const { localCameraTrack } = useLocalCameraTrack(isPublisher);

    // Publish tracks when ready
    usePublish([localMicrophoneTrack, localCameraTrack]);

    // Define state variables for mic and camera control
    const [micOn, setMic] = useState(isPublisher);
    const [cameraOn, setCamera] = useState(isPublisher);

    const remoteUsers = useRemoteUsers();

    // Function to handle session completion
    const handleCompleteSession = async () => {
        try {
            const response = await fetch('https://csci-5709-group8.onrender.com/api/sessions/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: session.session_id,
                    status: 'completed',
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update session status');
            }
            const data = await response.json();
            toast.success('Session updated successfully!');
            console.log('Session updated:', data);
        } catch (error) {
            console.error('Error updating session status:', error);
            toast.error('Failed to update session status.');
        }
    };

    // Handle call control button click
    const handleCallControl = async () => {
        if (calling && isPublisher) {
            await handleCompleteSession();
        }
        setCalling(a => !a);
        navigate('/live-session');
    };

    const expertVideoAvailable = remoteUsers.some(user => user.uid === session.expert_id);

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full font-poppins text-gray-900 bg-gradient-to-b from-base-200 to-base-200 ">
            {isPublisher && (
                <div className="flex top-0 left-0 bottom-0 right-0 w-full h-full p-4">
                    <div className="w-3/4 h-full rounded-lg p-4 z-10 overflow-auto">
                        <LocalUser
                            audioTrack={localMicrophoneTrack}
                            cameraOn={cameraOn}
                            micOn={micOn}
                            videoTrack={localCameraTrack}
                            cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                        >
                            <samp className="user-name text-gray-800 font-semibold">You</samp>
                        </LocalUser>
                    </div>
                    <div className="w-1/4 rounded-lg p-4 overflow-auto">
                        {isPublisher && isConnected && (
                            <div className="bg-gray-200 flex flex-col items-center space-y-4 p-4">
                                <div className="bg-white p-8 rounded-lg shadow-md mb-4 w-full max-w-sm text-left">
                                    <h2 className="text-xl font-semibold mb-2">Session Details</h2>
                                    <p className="text-sm text-gray-700 mb-1"><strong>Title:</strong> {session.title}</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong>Description:</strong> {session.description}</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong>Date:</strong> {new Date(session.session_date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong>Time:</strong> {new Date(`1970-01-01T${session.session_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong>Duration:</strong> {session.duration} minutes</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong>Status:</strong> {session.status.charAt(0).toUpperCase() + session.status.slice(1)}</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong>Expert Email:</strong> {session.expert_email}</p>
                                </div>
                                <button
                                    id="mic-control"
                                    className="bg-base-200 text-black p-2 rounded-lg flex items-center"
                                    onClick={() => setMic(a => !a)}
                                >
                                    <i className={`i-microphone ${!micOn ? "off" : ""}`}></i>
                                    <span className="ml-2">{micOn ? "Microphone Enabled" : "Microphone Disabled"}</span>
                                </button>

                                <button
                                    id="camera-control"
                                    className="bg-base-200 text-black p-2 rounded-lg flex items-center"
                                    onClick={() => setCamera(a => !a)}
                                >
                                    <i className={`i-camera ${!cameraOn ? "off" : ""}`}></i>
                                    <span className="ml-2">{cameraOn ? "Camera Enabled" : "Camera Disabled"}</span>
                                </button>
                                <button
                                    id="call-control"
                                    className={`p-2 rounded-lg ${calling ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
                                    onClick={handleCallControl}
                                >
                                    {calling ? <i className="i-phone-hangup"></i> : <i className="i-mdi-phone"></i>}
                                    <span className="ml-2">{"Close session"}</span>
                                </button>
                            </div>

                        )}
                    </div>
                </div>
            )}

            {isConnected && !expertVideoAvailable && !isPublisher && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center justify-center">
                        <p className="text-xl font-semibold text-gray-900 mb-4">Session has not started yet. Please connect after some time.</p>
                        <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-sm text-left">
                            <h2 className="text-xl font-semibold mb-2">Session Details</h2>
                            <p className="text-sm text-gray-700 mb-1"><strong>Title:</strong> {session.title}</p>
                            <p className="text-sm text-gray-700 mb-1"><strong>Description:</strong> {session.description}</p>
                            <p className="text-sm text-gray-700 mb-1"><strong>Date:</strong> {new Date(session.session_date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-700 mb-1"><strong>Time:</strong> {new Date(`1970-01-01T${session.session_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className="text-sm text-gray-700 mb-1"><strong>Duration:</strong> {session.duration} minutes</p>
                            <p className="text-sm text-gray-700 mb-1"><strong>Status:</strong> {session.status.charAt(0).toUpperCase() + session.status.slice(1)}</p>
                            <p className="text-sm text-gray-700 mb-1"><strong>Expert Email:</strong> {session.expert_email}</p>
                        </div>
                        <button
                            className="bg-black text-white rounded-full py-2 px-4 shadow-md hover:bg-gray-800 transition duration-300"
                            onClick={() => navigate('/live-session')}
                        >
                            Back to Live Session
                        </button>
                    </div>

                </div>
            )}

            <div className="flex flex-col justify-between h-full">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-800 font-semibold">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-red-600 font-semibold">{error}</p>
                    </div>
                ) : (
                    <>
                        <div className="flex-grow">
                            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                                <div id="user-list" className="gap-4">
                                    {remoteUsers.map((user) => (
                                        user.uid == session.expert_id && (
                                            <div
                                                className="w-[426px] h-[240px] sm:w-[640px] sm:h-[360px] md:w-[854px] md:h-[480px] lg:w-[1280px] lg:h-[720px] bg-gray-200 rounded-lg p-4"
                                                key={user.uid}
                                            >
                                                <RemoteUser
                                                    cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                                    user={user}
                                                >
                                                    <samp className="user-name">{user.uid}</samp>
                                                </RemoteUser>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
