import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalMicrophoneTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import { useState, useEffect } from "react";
import "../styles.css";

export const LiveVideo = () => {
    const appId = 'e947c59bbe8c4287954cb154e63be817';
    const [calling, setCalling] = useState(false);
    const [token, setToken] = useState(null);
    const isConnected = useIsConnected();

    // Fetch the token from the API
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch('http://localhost:8080/generate-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        channelName: "test",
                        uid: 12345, // Replace with the actual user ID
                        role: "publisher", // Or "subscriber" based on the user role
                        expireTime:  Date.now() + 3600000
                    })
                });
                const data = await response.json();
                console.log(data);
                console.log(data.token);
                setToken(data.token);
                setCalling(true);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();
    }, []);

    useJoin({ appid: appId, channel: "test", token:token, uid: 12345 }, calling);

    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    const remoteUsers = useRemoteUsers();

    return (
        <>
            <div id="room" className="room">
                <div id="user-list" className="user-list">
                    <div id="local-user" className="user">
                        <LocalUser
                            audioTrack={localMicrophoneTrack}
                            cameraOn={cameraOn}
                            micOn={micOn}
                            videoTrack={localCameraTrack}
                            cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                        >
                            <samp id="local-user-name" className="user-name">You</samp>
                        </LocalUser>
                    </div>
                    {remoteUsers.map((user) => (
                        <div className="user" key={user.uid}>
                            <RemoteUser
                                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                user={user}
                            >
                                <samp className="user-name" id={`remote-user-${user.uid}`}>
                                    {user.uid}
                                </samp>
                            </RemoteUser>
                        </div>
                    ))}
                </div>
            </div>
            {isConnected && (
                <div id="control" className="control">
                    <div id="left-control" className="left-control">
                        <button id="mic-control" className="btn" onClick={() => setMic(a => !a)}>
                            <i className={`i-microphone ${!micOn ? "off" : ""}`} />
                        </button>
                        <button id="camera-control" className="btn" onClick={() => setCamera(a => !a)}>
                            <i className={`i-camera ${!cameraOn ? "off" : ""}`} />
                        </button>
                    </div>
                    <button
                        id="call-control"
                        className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
                        onClick={() => setCalling(a => !a)}
                    >
                        {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
                    </button>
                </div>
            )}
        </>
    );
};

export default LiveVideo;
