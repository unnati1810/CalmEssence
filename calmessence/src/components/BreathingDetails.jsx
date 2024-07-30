import {useLocation} from 'react-router-dom';

function BreathingDetails() {
    const location = useLocation();
    const {item} = location.state || {};
    if (!item) {
        return <div className="p-4 text-center text-lg">No details available.</div>;
    }

    const extractYouTubeId = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
        return match ? match[1] : null;
    };

    console.log("Unnati", item.content_url)
    let steps = [];
    let cleanedSteps = [];
    if(item.media_type==='text'){
        steps  = item.text_content.match(/\d+\.\s.*?(?=\d+\.\s|$)/g) || [];

    // Clean content by removing the numbers and periods
    cleanedSteps = steps.map(step => step.replace(/^\d+\.\s/, '').trim());
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
                                    <p className="text-red-500">If the audio does not play, please check your browser or the audio file.</p>
                                </div>
                            )}
                           {item.media_type === 'video' && item.content_url.includes('youtube.com') ? (
                                <div className="space-y-4 pl-6">
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${extractYouTubeId(item.content_url)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full rounded-lg shadow-lg"
                                    ></iframe>
                                    <p className="text-red-500">If the video does not play, please check your browser or network settings.</p>
                                </div>
                            ) : (
                                item.media_type === 'video' && (
                                    <p className="text-red-500">Unsupported video URL.</p>
                                )
                            )}
                             {item.media_type === 'text' && (
                                <ol className="space-y-4 pl-6 list-decimal">
                                    {cleanedSteps.map((step, index) => (
                                        <li key={index} className="text-muted-foreground">
                                            {step}
                                        </li>
                                    ))}
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
