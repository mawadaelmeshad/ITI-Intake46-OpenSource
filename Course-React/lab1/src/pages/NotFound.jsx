import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found - Course Platform";
  }, []);

  return (
    <div className="container notfound-section">
      <div className="notfound-code">404</div>
      <h2 style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-text-1)', marginBottom: '0.75rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--color-text-3)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '380px', textAlign: 'center', lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary-custom">
        ← Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
