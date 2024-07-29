import { useNavigate } from 'react-router-dom';

function Cards({ item }) {
  const videoIcon = "https://previews.123rf.com/images/fokaspokas/fokaspokas1806/fokaspokas180600649/103145238-simple-video-camera-icon-white-icon-with-shadow-on-transparent-background.jpg";
  const textIcon = "https://static.thenounproject.com/png/24782-200.png"; // Use appropriate icon for text content
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/details', { state: { item } });
  };

  return (
      <div className='mt-4 my-3 p-3' onClick={handleCardClick}>
        <div className="card w-96 h-96 bg-base-100 shadow-xl image-full mt-10 hover:scale-110">
          <figure><img className="opacity-1" src={item.image} alt="Meditation" /></figure>
          <div className="card-body flex flex-col justify-between">
            <div className="basis-1/4 flex flex-row justify-between items-start">
              <div className="basis-3/4">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.duration}</p>
              </div>
              <div className="card-actions basis-1/4 justify-end">
                <img className='rounded-full w-10' src={item.media_type === 'video' ? videoIcon : textIcon}
                     alt="Media"/>
              </div>
            </div>
            <div className="basis-2/4 flex flex-row justify-between items-end flex-grow">
              <div className="basis-2/3">
                <p>{item.description}</p>
              </div>
              <div className="card-actions basis-1/3 justify-end">
                <p>{item.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Cards;
