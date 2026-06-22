import Container from 'react-bootstrap/Container';

function Hero() {
  return (
    <div className="gradient-bg p-5 rounded-4 mb-4 text-center mt-4 text-white shadow-lg mx-3">
      <Container className="py-5">
        <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Welcome to Our Courses</h1>
        <p className="lead fs-4 opacity-75">Discover the best courses to elevate your skills.</p>
      </Container>
    </div>
  );
}

export default Hero;
