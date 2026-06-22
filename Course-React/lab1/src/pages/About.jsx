import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
  useEffect(() => {
    document.title = "About - Course Platform";
  }, []);

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      {/* Hero */}
      <div className="about-hero">
        <span className="section-badge">👋 Our Story</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '1rem', marginBottom: '1rem' }}>
          We believe great <span className="gradient-text">education</span><br />changes everything.
        </h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
          Course Platform was built to make high-quality, professional education accessible to everyone — regardless of background or budget.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="row g-4 mt-4">
        {[
          { icon: '🎯', title: 'Our Mission', desc: 'To democratize education by connecting passionate learners with the world\'s best instructors and course content.' },
          { icon: '💡', title: 'Our Vision', desc: 'A world where anyone can acquire any skill they desire, transforming their career and life with knowledge.' },
          { icon: '🤝', title: 'Our Values', desc: 'We are guided by integrity, innovation, and inclusion. Every learner deserves a world-class education.' },
        ].map((card, i) => (
          <div className="col-md-4" key={i}>
            <div className="about-card h-100">
              <div className="about-icon">{card.icon}</div>
              <h5 style={{ fontWeight: 700, color: 'var(--color-text-1)', marginBottom: '0.75rem' }}>{card.title}</h5>
              <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Bar */}
      <div style={{
        marginTop: '4rem',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        {[
          { value: '10+', label: 'Expert Courses' },
          { value: '5,000+', label: 'Active Learners' },
          { value: '98%', label: 'Satisfaction Rate' },
          { value: '4.9★', label: 'Average Rating' },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div style={{ fontSize: '2rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-1)' }}>Ready to start learning?</h3>
        <Link to="/courses" className="btn-primary-custom">Browse All Courses →</Link>
      </div>
    </div>
  );
}

export default About;
