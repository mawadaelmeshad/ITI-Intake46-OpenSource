import { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ id, title, duration }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <p>Duration: {duration}</p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link to={`/courses/${id}`}>
          <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
            View Details
          </button>
        </Link>
        <button 
          onClick={toggleFavorite} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: isFavorite ? '#ffecf2' : '#f0f0f0', border: '1px solid #ccc' }}
        >
          {isFavorite ? 'Added To Favorite ❤️' : 'Add To Favorite'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
