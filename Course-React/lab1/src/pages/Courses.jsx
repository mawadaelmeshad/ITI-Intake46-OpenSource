import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import Form from 'react-bootstrap/Form';

const coursesData = [
  { id: 1, title: 'React Fundamentals', duration: '4 Weeks' },
  { id: 2, title: 'Advanced React patterns', duration: '6 Weeks' },
  { id: 3, title: 'State Management with Redux', duration: '3 Weeks' },
  { id: 4, title: 'Next.js for Beginners', duration: '5 Weeks' },
];

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = "Courses - Course Platform";
  }, []);

  useEffect(() => {
    console.log('Courses Page Mounted');
    return () => {
      console.log('Courses Page Unmounted');
    };
  }, []);
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(`Current search term: ${searchTerm}`);
  }, 4000);

  return () => clearTimeout(timer);
}, [searchTerm]);
 
  const filteredCourses = coursesData.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Our Courses</h2>
      
      <Form.Group className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <div className="d-flex flex-wrap">
        {filteredCourses.map(course => (
          <CourseCard 
            key={course.id}
            id={course.id}
            title={course.title}
            duration={course.duration}
          />
        ))}
      </div>
      
      {filteredCourses.length === 0 && <p>No courses found matching your search.</p>}
    </div>
  );
}

export default Courses;
