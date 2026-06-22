import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  useEffect(() => {
    document.title = "Home - Course Platform";
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container position-relative">
          <span className="section-badge">🚀 Learn Without Limits</span>
          <h1 className="hero-title">
            Elevate Your Skills with{' '}
            <span className="gradient-text">Expert-Led</span> Courses
          </h1>
          <p className="hero-subtitle">
            Join thousands of learners mastering in-demand skills through
            structured, project-based curricula designed by industry professionals.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/courses" className="btn-primary-custom">
              Browse Courses →
            </Link>
            <Link to="/about" className="btn-ghost">
              Learn More
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">10+</div>
              <div className="hero-stat-label">Courses</div>
            </div>
            <div>
              <div className="hero-stat-value">5K+</div>
              <div className="hero-stat-label">Students</div>
            </div>
            <div>
              <div className="hero-stat-value">98%</div>
              <div className="hero-stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
        <div className="text-center mb-5">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="fw-bold mt-2" style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>
            Everything you need to{' '}
            <span className="gradient-text">succeed</span>
          </h2>
        </div>
        <div className="row g-4">
          {[
            { icon: '🎯', title: 'Structured Learning', desc: 'Carefully crafted curricula that take you from beginner to expert with a clear progression path.' },
            { icon: '⚡', title: 'Learn at Your Pace', desc: 'Access course content anytime, anywhere. No deadlines, no pressure — just pure learning.' },
            { icon: '🏆', title: 'Industry Recognized', desc: 'Earn certificates that are respected by top companies and help boost your career prospects.' },
          ].map((f, i) => (
            <div className="col-md-4" key={i}>
              <div className="about-card h-100">
                <div className="about-icon">{f.icon}</div>
                <h5 className="fw-bold mb-2" style={{ color: 'var(--color-text-1)' }}>{f.title}</h5>
                <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
