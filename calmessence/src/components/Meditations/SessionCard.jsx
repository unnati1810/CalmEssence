import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';


const SessionCard = ({ session }) => {
  const navigate = useNavigate();

  const handleSessionSelect = (sessionId) => {
    navigate(`/meditations/${sessionId}`);
  };

  return (
    <div className="flex-shrink-0 sm:w-60 md:w-96 bg-white rounded-lg shadow-lg mb-4 cursor-pointer" onClick={() => handleSessionSelect(session.id)}>
        <img src={`https://libraryitems.insighttimer.com/${session.id}/pictures/tiny_rectangle_medium.jpeg`} alt={session.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{session.title}</h3>
            <p className="text-gray-700 mb-1">{session.content_type}</p>
            {session.rating_score ? <p className="text-gray-700 mb-1">{session.rating_score} stars</p> : <p></p>}
            <p className="text-gray-700">{(session.media_length/60).toString().split(".")[0]} minutes</p>
        </div>
    </div>
  );
};

SessionCard.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content_type: PropTypes.string.isRequired,
    rating_score: PropTypes.number.isRequired,
    media_length: PropTypes.number.isRequired,
  }).isRequired,
};

export default SessionCard;
