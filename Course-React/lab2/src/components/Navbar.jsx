import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', gap: '1rem' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</Link>
      <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
    </nav>
  );
};

export default Navbar;
