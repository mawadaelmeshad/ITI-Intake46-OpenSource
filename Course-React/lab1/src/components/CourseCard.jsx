import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CourseCard() {
  const title = "React Fundamentals";
  const description = "Learn the basics of React, including components, props, and state.";
  const duration = "4 Weeks";
  const isAvailable = true;
  const image = "https://cdn.idevie.com/wp-content/uploads/2022/09/1664407924_365_maxresdefault.jpg";

  return (
    <Card style={{ width: '18rem', margin: '10px auto' }}>
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <p><strong>Duration:</strong> {duration}</p>
        {isAvailable ? (
          <Button variant="primary">Start Course</Button>
        ) : (
          <Button variant="secondary" disabled>Coming Soon</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
