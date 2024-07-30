
const Loader = ({ type }) => {
    const loaderStyle = type === 'fetch' ? 'w-16 h-16' : 'w-10 h-10';

    return (
        <div className={`flex justify-center items-center ${type === 'fetch' ? 'h-full' : 'h-24'}`}>
            <div className={`${loaderStyle} border-4 border-t-4 border-gray-600 border-solid rounded-full animate-spin`}></div>
        </div>
    );
};

export default Loader;
