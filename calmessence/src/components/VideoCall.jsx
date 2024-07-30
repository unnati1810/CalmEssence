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
import { useLocation } from 'react-router-dom';
import "../styles.css";

export const LiveVideo = () => {
    const { state } = useLocation();
    const { session, loggedInUserId, user_email } = state || {};

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
                const response = await fetch('http://localhost:8080/api/tokens/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        channelName: session.agora_channel_id, // Use Agora channel ID for channel
                        uid: loggedInUserId, // Use logged-in user ID
                        role: role, // Role (publisher or subscriber)
                        expireTime: 3600, // Set expiration time as needed
                        user_email: user_email // Use user email from state
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

    console.log(remoteUsers.keys());
    console.log("Remote Users"+remoteUsers);
    console.log("Remote Users"+remoteUsers.toString());

    return (
        <div className="w-full min-h-screen font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <div className="flex flex-col lg:flex-row h-full">
                <div className="session-details bg-white shadow-md rounded-lg p-6 lg:w-1/3 mb-6 lg:mb-0">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Session Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p className="text-gray-700"><strong className="font-bold">Title:</strong> {session.title}</p>
                        <p className="text-gray-700"><strong className="font-bold">Description:</strong> {session.description}</p>
                        <p className="text-gray-700"><strong className="font-bold">Date:</strong> {new Date(session.session_date).toLocaleDateString()}</p>
                        <p className="text-gray-700"><strong className="font-bold">Time:</strong> {session.session_time}</p>
                        <p className="text-gray-700"><strong className="font-bold">Status:</strong> {session.status}</p>
                        <p className="text-gray-700"><strong className="font-bold">Expert Email:</strong> {session.expert_email}</p>
                    </div>
                </div>

                <div className="lg:w-2/3 flex flex-col justify-between">
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
                            <div id="room" className="bg-white shadow-md rounded-lg p-6 mb-6 flex-grow">
                                <div id="user-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {isPublisher && (
                                        <div id="local-user" className="user bg-gray-200 rounded-lg p-4">
                                            <LocalUser
                                                audioTrack={localMicrophoneTrack}
                                                cameraOn={cameraOn}
                                                micOn={micOn}
                                                videoTrack={localCameraTrack}
                                                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                            >
                                                <samp id="local-user-name" className="user-name text-gray-800 font-semibold">You</samp>
                                            </LocalUser>
                                        </div>
                                    )}
                                    {remoteUsers.map((user) => (
                                        <div className="user" key={user.uid}>
                                            <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                                                <samp className="user-name">{user.uid}</samp>
                                            </RemoteUser>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {isConnected && (
                                <div className="flex justify-between mt-4">
                                    <div className="flex space-x-4">
                                        {isPublisher && (
                                            <>
                                                <button id="mic-control" className="btn bg-base-200 text-black p-2 rounded-lg" onClick={() => setMic(a => !a)}>
                                                    <i className={`i-microphone ${!micOn ? "off" : ""}`}></i>
                                                </button>
                                                <button id="camera-control" className="btn bg-base-200 text-black p-2 rounded-lg" onClick={() => setCamera(a => !a)}>
                                                    <i className={`i-camera ${!cameraOn ? "off" : ""}`}></i>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <button id="call-control" className={`btn p-2 rounded-lg ${calling ? "bg-red-600 text-white" : "bg-green-600 text-white"}`} onClick={() => setCalling(a => !a)}>
                                        {calling ? <i className="i-phone-hangup"></i> : <i className="i-mdi-phone"></i>}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveVideo;
