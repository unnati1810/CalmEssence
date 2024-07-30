// Author: Rameez Parkar

import { useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import not_found from "../../assets/not_found.png";

const MeditationSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [vocals, setVocals] = useState("");
    const [rating, setRating] = useState(1);
    const [sessionTime, setSessionTime] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleFilters();
    }, []);

    const handleFilters = async () => {
        setLoading(true);
        const lengthRange = sessionTime ? `&length_range=${sessionTime}` : ``;
        const sortOption = sortBy ? `&sort_option=${sortBy}` : ``;
        const voiceGender = vocals ? `&voice_gender=${vocals}` : ``;
        const size = '100';
        const dataUrl = `https://filtering.insighttimer-api.net/api/v1/single-tracks/filter?content_langs=en&device_lang=en${lengthRange}&offset=0&size=${size}${sortOption}${voiceGender}`;
        let results = await axios.get(dataUrl);
        results = results.data.map((item) => {
            return item.item_summary.library_item_summary
        });
        results = results.filter((session) => session.rating_score >= rating);
        if (searchTerm.trim()) {
            setFilteredSessions(results.filter((session) =>
                session.title.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredSessions(results);
        }
        setLoading(false);
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center p-4 pt-20 bg-gradient-to-b from-purple-50 to-purple-100">
        <div className="w-full p-8">
          <div className="lg:flex justify-between items-center lg:space-x-4 mb-8">
            <h1 className="text-4xl mb-4 font-bold">Meditations</h1>
            <div className="flex">
                <input
                type="text"
                placeholder="Search..."
                className="w-96 px-4 py-2 mr-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                onClick={handleFilters}
                >
                Search
                </button>
            </div>
          </div>
  
          <div className="mb-8">
            <div className="text-lg mb-2 font-bold">Filters</div>
            <div className=" p-8 bg-purple-100 rounded-3xl shadow-2xl">
            <div className="lg:flex">
                <div className="w-full mr-8">
                    <div className="font-semibold">Vocals</div>
                    <select
                    className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                    value={vocals}
                    onChange={(e) => setVocals(e.target.value)}
                    >
                        <option value="">Vocals</option>
                        <option value="female">Female only</option>
                        <option value="male">Male only</option>
                    </select>
                </div>
                
                <div className="w-full mr-4">
                    <div className="font-semibold">Ratings</div>
                    <div className="items-center mb-2 w-full">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="0.5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full"
                        />
                        <span>{rating}+ Stars</span>
                    </div>
                </div>
                
                <div className="w-full mr-4">
                    <div className="font-semibold">Session Time</div>
                    <select
                    className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    >
                    <option value="">Session Time</option>
                    <option value="0to5">Short</option>
                    <option value="5to30">Long</option>
                    <option value="30to">Extended</option>
                    </select>
                </div>
                
                <div className="w-full mr-4">
                    <div className="font-semibold">Sort By</div>
                    <select
                    className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    >
                    <option value="">Sort By</option>
                    <option value="most_played">Popular</option>
                    <option value="newest">Newest</option>
                    </select>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    onClick={handleFilters}
                    >
                    Apply Filters
                </button>
            </div>
            </div>
          </div>
  
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <ClipLoader size={50} color={"#9333ea"} loading={loading} />
            </div>
        ) : ( filteredSessions.length > 0 ? (
            <div>
                {filteredSessions.filter((item) => {
                    return item.content_type === "GUIDED";
                }).length > 0 ? <h6 className="text-lg font-bold">GUIDED</h6> :
                <div></div>}
                <div className="flex overflow-x-auto space-x-4 mb-4">
                    {filteredSessions.filter((item) => {
                        return item.content_type === "GUIDED";
                    }).map((session) => (
                    <SessionCard key={session.id} session={session} />
                    ))}
                </div>

                {filteredSessions.filter((item) => {
                    return item.content_type === "MUSIC";
                }).length > 0 ? <h6 className="text-lg font-bold">MUSIC</h6> :
                <div></div>}
                <div className="flex overflow-x-auto space-x-4 mb-4">
                    {filteredSessions.filter((item) => {
                        return item.content_type === "MUSIC";
                    }).map((session) => (
                    <SessionCard key={session.id} session={session} />
                    ))}
                </div>

                {filteredSessions.filter((item) => {
                    return item.content_type === "TALKS";
                }).length > 0 ? <h6 className="text-lg font-bold">TALKS</h6> :
                <div></div>}
                <div className="flex overflow-x-auto space-x-4 mb-4">
                    {filteredSessions.filter((item) => {
                        return item.content_type === "TALKS";
                    }).map((session) => (
                    <SessionCard key={session.id} session={session} />
                    ))}
                </div>
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center h-128">
                <img src={not_found} alt={`Not Found`} className="w-64 h-64 object-cover rounded-lg mb-4" />
                <h6  className="text-xl font-bold">Could not find what you are looking for. Kindly modify the search and filter options.</h6>
            </div>
        )
        )}
        </div>
      </div>
    );
  };

export default MeditationSearch;
