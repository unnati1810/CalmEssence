import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cards from './Cards';
import debounce from 'lodash/debounce'; // Import debounce from lodash

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [noMatchFound, setNoMatchFound] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 5,
        totalItems: 0,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate(); // Use navigate from react-router-dom

    // Debounce function to limit the number of API calls
    const debouncedFetchData = useCallback(
        debounce(async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const {data} = await axios.get('http://localhost:8080/api/breathing/list', {
                    params: {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        searchTerm: searchTerm
                    }
                });
                setFilteredData(data.data);
                setPagination(data.pagination);

                // Check if no matches found
                setNoMatchFound(data.data.length === 0);
            } catch (error) {
                console.error('Error fetching breathing list:', error);
                setNoMatchFound(true);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        }, 300), // Debounce delay in milliseconds
        [pagination.page, searchTerm] // Dependencies
    );

    useEffect(() => {
        // Fetch data when component mounts or search term or pagination changes
        fetchData();
    }, [pagination.page]); // Dependencies

    const fetchData = () => {
        debouncedFetchData();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPagination(prev => ({...prev, page: 1}));
    };

    const handleSearchClick = () => {
        // Reset page number to 1 and fetch data
        setPagination(prev => ({...prev, page: 1}));
        // fetchData();
    };

    const handlePageChange = (newPage) => {
        // Check if newPage is within valid bounds before changing
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({...prev, page: newPage}));
        }
    };

    useEffect(() => {
        // Fetch data when pagination or search term changes
        fetchData();
    }, [pagination.page, searchTerm]); // Dependencies

    return (
        <div
            className="w-full min-h-screen font-poppins antialiased text-gray-900 bg-gradient-to-b from-purple-50 to-purple-100 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20">
            <div className="flex flex-col items-center w-full h-full">
                <div className="w-full max-w-4xl flex justify-center items-center mb-4">
                    <label className="input input-bordered flex items-center gap-2 w-full max-w-xl">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-4 h-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>

                    <button className="btn ml-4" onClick={handleSearchClick} disabled={loading}>
                        Search
                    </button>
                </div>

                <div className="w-full flex flex-wrap justify-center items-center">
                    {/* Display cards if there are matches */}
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <Cards item={item} key={item.breathing_id}/>
                        ))
                    ) : (
                        // If no matches found, display the message
                        noMatchFound && (
                            <div className="flex items-center justify-center w-full p-4 pt-16 pb-16">
                                <p className="text-xl font-bold">
                                    Sorry, we couldn&apos;t find any match for what you are looking for.
                                </p>
                            </div>
                        )
                    )}
                </div>

                {!noMatchFound && (
                    <div className="flex justify-center items-center mt-4">
                        <button
                            className="btn mx-2"
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1 || loading}
                        >
                            Previous
                        </button>
                        <span className="mx-2">
                            Page {pagination.page} of {pagination.totalPages}
                        </span>
                        <button
                            className="btn mx-2"
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.totalPages || loading}
                        >
                            Next
                        </button>
                    </div>
                )}

                <button
                    className="fixed bottom-10 right-10 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => navigate('/create-breathing')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            d="M12 4.5a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V5.25A.75.75 0 0112 4.5z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Search;
