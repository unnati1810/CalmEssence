const Cover = ({ url }) => {
    return (
        <div className={`relative w-full h-[35vh] bg-neutral-300 ${!url ? 'hidden' : ''}`}>
            <img src={url} alt="cover" className={`object-cover w-full h-full ${!url ? 'hidden' : ''}`} />
        </div>
    );
}

export default Cover;