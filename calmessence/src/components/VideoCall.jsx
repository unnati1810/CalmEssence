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
    const isPublisher = loggedInUserId === session.expert_id;
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

    console.log("Remote user length "+remoteUsers.length);
    console.log("Remote user length "+calling);
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full font-poppins text-gray-900 bg-gradient-to-b from-base-200 to-base-200 overflow-auto">
            {isPublisher && (
                <div className="fixed top-10 left-10 bottom-10 right-10 bg-gray-200 rounded-lg p-4 z-10 overflow-auto">
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
                                    {remoteUsers.length === 0 && !isPublisher && (
                                        <div className="flex justify-center items-center h-full">
                                            <p className="text-gray-800 font-semibold">No users have joined the call. Please wait expert to join the session.</p>
                                        </div>
                                    )}
                                    {remoteUsers.map((user) => (
                                        user.uid === session.expert_id && (
                                            <div
                                                className="w-[426px] h-[240px] sm:w-[640px] sm:h-[360px] md:w-[854px] md:h-[480px] lg:w-[1280px] lg:h-[720px] bg-gray-200 rounded-lg p-4"
                                                key={user.uid}>
                                                <RemoteUser
                                                    cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                                    user={user}>
                                                    <samp className="user-name">{user.uid}</samp>
                                                </RemoteUser>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>

                        {isConnected && (
                            <div className="flex justify-between mt-4 fixed bottom-10 left-10 w-full px-4">
                                <div className="flex space-x-4">
                                    {isPublisher && (
                                        <>
                                            <button id="mic-control"
                                                    className="btn bg-base-200 text-black p-2 rounded-lg"
                                                    onClick={() => setMic(a => !a)}>
                                                <i className={`i-microphone ${!micOn ? "off" : ""}`}></i>
                                            </button>
                                            <button id="camera-control"
                                                    className="btn bg-base-200 text-black p-2 rounded-lg"
                                                    onClick={() => setCamera(a => !a)}>
                                                <i className={`i-camera ${!cameraOn ? "off" : ""}`}></i>
                                            </button>
                                        </>
                                    )}
                                </div>
                                <button id="call-control"
                                        className={`btn p-2 rounded-lg ${calling ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
                                        onClick={handleCallControl}>
                                    {calling ? <i className="i-phone-hangup"></i> : <i className="i-mdi-phone"></i>}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LiveVideo;
