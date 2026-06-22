import { useState } from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ id, title, duration, image, description }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="course-card">
      <div className="course-card-img-wrap">
        <img
          src={image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"}
          alt={title}
        />
      </div>
      <div className="course-card-body">
        <span className="course-card-tag">Online Course</span>
        <div className="course-card-title">{title}</div>
        <div className="course-card-desc">{description || 'Explore this course and expand your knowledge with expert-led content.'}</div>
        <div className="course-card-meta">
          <span>⏱</span>
          <span>{duration}</span>
        </div>
        <div className="course-card-actions">
          <Link to={`/courses/${id}`} className="card-btn-primary">
            View Details
          </Link>
          <button
            className={`card-btn-fav ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? '❤️ Added to Favorites' : '♡ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
