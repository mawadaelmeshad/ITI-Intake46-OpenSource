import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Courses - Course Platform";

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setCourses(response.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return (
    <div className="loading-wrap">
      <div className="spinner-custom"></div>
      <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>Loading courses...</p>
    </div>
  );

  if (error) return (
    <div style={{
      background: 'rgba(239,68,68,0.08)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: 'var(--radius-md)',
      color: '#f87171',
      padding: '1rem 1.5rem',
      fontSize: '0.9rem'
    }}>
      ⚠️ Failed to load courses: {error}
    </div>
  );

  return (
    <div className="grid-courses">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          duration="4 Weeks"
          description={course.body}
        />
      ))}
    </div>
  );
}

export default CoursesList;
