import {useLocation} from 'react-router-dom';

function BreathingDetails() {
    const location = useLocation();
    const {item} = location.state || {};

    if (!item) {
        return <div className="p-4 text-center text-lg">No details available.</div>;
    }

    return (
        <div
            className="w-full min-h-screen font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <div className="w-full h-full mx-auto px-4 md:px-6 py-2 md:py-4">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">{item.title}</h1>
                        <p className="text-muted-foreground md:text-xl">{item.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="aspect-video overflow-hidden rounded-lg">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center space-x-2">
                                    <ClockIcon className="h-5 w-5 text-muted-foreground"/>
                                    <span className="text-muted-foreground">{item.duration} minutes</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <UserIcon className="h-5 w-5 text-muted-foreground"/>
                                    <span className="text-muted-foreground">{item.user_name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MailIcon className="h-5 w-5 text-muted-foreground"/>
                                    <span className="text-muted-foreground">{item.user_email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">How to do it</h2>
                            {item.media_type === 'audio' && (
                                <div className="space-y-4 pl-6">
                                    <audio controls className="w-full rounded-lg shadow-lg">
                                        <source src={item.content_url} type="audio/mpeg"/>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                            {item.media_type === 'video' && (
                                <div className="space-y-4 pl-6">
                                    <video controls className="w-full rounded-lg shadow-lg">
                                        <source
                                            src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}
                            {item.media_type === 'text' && (
                                <ol className="space-y-4 list-decimal pl-6">
                                    <li>
                                        <h3 className="text-lg font-semibold">Sit comfortably</h3>
                                        <p className="text-muted-foreground">
                                            Find a quiet and comfortable place to sit. You can sit on a chair or
                                            cross-legged on the floor.
                                        </p>
                                    </li>
                                    <li>
                                        <h3 className="text-lg font-semibold">Breathe deeply</h3>
                                        <p className="text-muted-foreground">
                                            Inhale slowly through your nose, feeling your belly expand. Exhale slowly
                                            through your mouth, letting your belly contract.
                                        </p>
                                    </li>
                                    <li>
                                        <h3 className="text-lg font-semibold">Focus on your breath</h3>
                                        <p className="text-muted-foreground">
                                            Concentrate on the sensation of air moving in and out of your body. If your
                                            mind wanders, gently bring your attention back to your breath.
                                        </p>
                                    </li>
                                    <li>
                                        <h3 className="text-lg font-semibold">Repeat for 10 minutes</h3>
                                        <p className="text-muted-foreground">
                                            Continue this breathing exercise for 10 minutes, taking slow, deep breaths.
                                        </p>
                                    </li>
                                </ol>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ClockIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    );
}

function MailIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
    );
}

function UserIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    );
}

export default BreathingDetails;
