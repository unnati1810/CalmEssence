import { useNavigate } from 'react-router-dom';

function Cards({ item }) {
 
  const videoIcon = "https://www.shutterstock.com/image-vector/video-camera-icon-trendy-flat-260nw-675488938.jpg";
  const textIcon = "https://www.shutterstock.com/image-vector/internet-education-concept-elearning-resources-600nw-1485832811.jpg";
  const audioIcon = "https://static.vecteezy.com/system/resources/thumbnails/007/128/172/small/audio-speaker-icon-free-vector.jpg"; 
  
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/details', { state: { item } });
  };

    // Select icon based on media type
    const getIcon = () => {
      switch (item.media_type) {
        case 'video':
          return videoIcon;
        case 'audio':
          return audioIcon;
        case 'text':
          return textIcon;
        default:
          return textIcon; 
      }
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
                <img className='rounded-full w-10' src={getIcon()}
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
