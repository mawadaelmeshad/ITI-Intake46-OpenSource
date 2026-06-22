import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ⚡ CoursePlatform
            </span>
            <p style={{ color: 'var(--color-text-3)', fontSize: '0.82rem', margin: '4px 0 0' }}>
              Empowering learners worldwide.
            </p>
          </div>
          <div className="d-flex align-items-center gap-4">
            <Link to="/" style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', textDecoration: 'none' }}>Home</Link>
            <Link to="/courses" style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', textDecoration: 'none' }}>Courses</Link>
            <Link to="/about" style={{ color: 'var(--color-text-3)', fontSize: '0.85rem', textDecoration: 'none' }}>About</Link>
          </div>
          <p style={{ color: 'var(--color-text-3)', fontSize: '0.8rem', margin: 0 }}>
            © 2026 CoursePlatform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
