import {useLocation} from 'react-router-dom';
import {useState} from "react";

function ArticleDetail() {
    const {state} = useLocation();
    const {item} = state || {};
    const [imgError, setImgError] = useState(false);

    const handleError = () => {
        setImgError(true);
    };

    if (!item) {
        return <div className="text-center text-xl font-bold">No article data available</div>;
    }

    return (
        <div className="w-full min-h-screen font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <article className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
                <header className="space-y-4 not-prose ">
                    <h1 className="text-4xl font-bold text-start">{item.title}</h1>
                    <div className="flex items-start justify-start gap-4 text-muted-foreground">
                        <div>
                            <img src={`https://eu.ui-avatars.com/api/?name=${item.user_name}&size=250`}
                                 alt="Author Avatar" className="h-10 w-10 rounded-full"/>
                        </div>
                        <div className="text-center">
                            <div className="font-medium">{item.user_name}</div>
                            <div className="text-sm">Published on {new Date(item.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </header>
                <div className="mt-8">
                    {!imgError ? (<img
                        src={item.image || 'https://eu.ui-avatars.com/api/?name=Article+Image&size=250'}
                        alt="Article image"
                        className="aspect-video rounded-lg object-cover mx-auto w-96 h-80"
                        onError={handleError}

                    />) : (
                        <img
                            src={'https://eu.ui-avatars.com/api/?name=Article+Image&size=250'}
                            alt="Article image"
                            className="aspect-video rounded-lg object-cover mx-auto w-96 h-80"
                         />
                    )}
                </div>
                <div className="mt-8 space-y-4" dangerouslySetInnerHTML={{__html: item.content}}></div>
            </article>
        </div>
    );
}

export default ArticleDetail;
