// Author: Rameez Parkar

import { useState } from "react";
import SessionCard from "./SessionCard";

const initialSessions = [
  { id: 1, title: "Morning Meditation", category: "Morning", rating: 4.5, time: "10 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 2, title: "Evening Relaxation", category: "Evening", rating: 4.7, time: "20 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 3, title: "Morning Meditation", category: "Morning", rating: 4.5, time: "10 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 4, title: "Evening Relaxation", category: "Evening", rating: 4.7, time: "20 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 5, title: "Morning Meditation", category: "Morning", rating: 4.5, time: "10 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 6, title: "Evening Relaxation", category: "Evening", rating: 4.7, time: "20 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 7, title: "Morning Meditation", category: "Morning", rating: 4.5, time: "10 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 8, title: "Evening Relaxation", category: "Evening", rating: 4.7, time: "20 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 9, title: "Morning Meditation", category: "Morning", rating: 4.5, time: "10 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 10, title: "Evening Relaxation", category: "Evening", rating: 4.7, time: "20 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 11, title: "Morning Meditation", category: "Morning", rating: 4.5, time: "10 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 12, title: "Evening Relaxation", category: "Evening", rating: 4.7, time: "20 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 13, title: "Morning Meditation", category: "Morning", rating: 4.5, time: "10 min", thumbnail: "https://via.placeholder.com/150" },
  { id: 14, title: "Evening Relaxation", category: "Evening", rating: 4.7, time: "20 min", thumbnail: "https://via.placeholder.com/150" },
];

const MeditationSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSessions, setFilteredSessions] = useState(initialSessions);
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(5);
    const [sessionTime, setSessionTime] = useState("");
    const [sortBy, setSortBy] = useState("");
  
    const handleSearch = () => {
      let results = initialSessions;
  
      if (searchTerm) {
        results = results.filter((session) =>
          session.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      if (category) {
        results = results.filter((session) => session.category === category);
      }
  
      if (rating) {
        results = results.filter((session) => session.rating <= rating);
      }
  
      if (sessionTime) {
        results = results.filter((session) => session.time === sessionTime);
      }
  
      if (sortBy) {
        results = results.sort((a, b) => {
          if (sortBy === "Rating") return b.rating - a.rating;
          if (sortBy === "Time") return parseInt(a.time) - parseInt(b.time);
          return 0;
        });
      }
  
      setFilteredSessions(results);
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center p-4 pt-20 bg-gradient-to-b from-purple-50 to-purple-100">
        <div className="w-full p-8 bg-white rounded-3xl shadow-2xl">
          <div className="lg:flex justify-between items-center lg:space-x-4 mb-8">
            <h1 className="text-4xl mb-4">Meditations</h1>
            <div className="flex">
                <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 mr-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                onClick={handleSearch}
                >
                Search
                </button>
            </div>
          </div>
  
          <div className="mb-8">
            <h6 className="text-lg mb-2 font-bold">Filters</h6>
            <div className="lg:flex">
                <div className="w-full mr-4">
                    <div className="font-semibold">Category</div>
                    <select
                    className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Category</option>
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                        {/* Add more categories as needed */}
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
                        <span>{rating} Stars</span>
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
                    <option value="10 min">10 min</option>
                    <option value="20 min">20 min</option>
                    {/* Add more session times as needed */}
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
                    <option value="Rating">Rating</option>
                    <option value="Time">Time</option>
                    </select>
                </div>
            </div>
            <div className="w-full flex justify-end">
            <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={handleSearch}
                >
                Apply Filters
                </button>
            </div>
          </div>
  
          <div className="flex overflow-x-auto space-x-4">
            {filteredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default MeditationSearch;
