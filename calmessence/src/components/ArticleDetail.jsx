import { useLocation } from 'react-router-dom';

function ArticleDetail() {
    const { state } = useLocation();
    const { item } = state || {};

    if (!item) {
        return <div className="text-center text-xl font-bold">No article data available</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <article className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
                <header className="space-y-4 not-prose">
                    <h1 className="text-4xl font-bold text-center">{item.title}</h1>
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        <div>
                            <img src="/placeholder.svg" alt="Author Avatar" className="h-10 w-10 rounded-full" />
                        </div>
                        <div className="text-center">
                            <div className="font-medium">{item.user_name}</div>
                            <div className="text-sm">Published on {new Date(item.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </header>
                <div className="mt-8">
                    <img
                        src={item.image || '/placeholder.svg'}
                        alt="Article Image"
                        className="aspect-video rounded-lg object-cover mx-auto"
                    />
                </div>
                <div className="mt-8 space-y-4" dangerouslySetInnerHTML={{ __html: item.content }}></div>
            </article>
        </div>
    );
}

export default ArticleDetail;
