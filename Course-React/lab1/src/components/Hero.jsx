import Container from 'react-bootstrap/Container';

function Hero() {
  return (
    <div className="bg-light p-5 rounded-lg mb-4 text-center mt-4">
      <Container>
        <h1 className="display-4">Welcome to Our Courses</h1>
        <p className="lead">Discover the best courses to elevate your skills.</p>
      </Container>
    </div>
  );
}

export default Hero;
