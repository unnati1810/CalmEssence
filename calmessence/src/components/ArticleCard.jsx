import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";

function ArticleCard({item}) {
    const navigate = useNavigate();
    const [imgError, setImgError] = useState(false);

    const handleError = () => {
        setImgError(true);
    };

    const handleCardClick = () => {
        navigate('/article-details', {state: {item}});
    };

    return (
        <div className="m-2 group relative overflow-hidden rounded-lg shadow-lg" onClick={handleCardClick}>
            <Link to="#" className="absolute inset-0 z-10">
                <span className="sr-only">View article</span>
            </Link>
            {!imgError ? (<img
                src={item.image || 'https://eu.ui-avatars.com/api/?name=Article+Image&size=250'}
                alt="Article image"
                width={400}
                height={300}
                className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-300"
                onError={handleError}

            />) : (
                <img
                    src={'https://eu.ui-avatars.com/api/?name=Article+Image&size=250'}
                    width={400}
                    height={300}
                    className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-300"
                />
            )

            }

            <div className="p-4 bg-background">
                <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{item.user_name}</span>
                    <span>•</span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;
