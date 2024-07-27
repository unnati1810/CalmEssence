import PropTypes from "prop-types";

const SessionCard = ({ session }) => {
  return (
    <div className="flex-shrink-0 w-60 p-4 bg-white rounded-lg shadow-lg">
      <img src={session.thumbnail} alt={session.title} className="w-full h-32 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-bold mb-2">{session.title}</h3>
      <p className="text-gray-700 mb-1">Category: {session.category}</p>
      <p className="text-gray-700 mb-1">Rating: {session.rating} stars</p>
      <p className="text-gray-700">Time: {session.time}</p>
    </div>
  );
};

SessionCard.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired, // New prop for the thumbnail image URL
  }).isRequired,
};

export default SessionCard;
