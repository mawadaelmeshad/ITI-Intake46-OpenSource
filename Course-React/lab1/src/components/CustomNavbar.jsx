import { Link, NavLink } from 'react-router-dom';

function CustomNavbar() {
  return (
    <nav className="nav-glass sticky-top">
      <div className="container d-flex align-items-center justify-content-between py-1">
        <Link to="/" className="nav-brand">
          ⚡ CoursePlatform
        </Link>

        <div className="d-flex align-items-center gap-2">
          <NavLink to="/" end className="nav-pill-link">Home</NavLink>
          <NavLink to="/courses" className="nav-pill-link">Courses</NavLink>
          <NavLink to="/about" className="nav-pill-link">About</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
