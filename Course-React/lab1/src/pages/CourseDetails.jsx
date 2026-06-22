import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `Course ${id} Details - Course Platform`;

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setCourse(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return (
    <div className="loading-wrap">
      <div className="spinner-custom"></div>
      <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>Loading course details...</p>
    </div>
  );

  if (error) return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      <div style={{
        background: 'rgba(239,68,68,0.08)',
        border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 'var(--radius-md)',
        color: '#f87171',
        padding: '1rem 1.5rem'
      }}>
        ⚠️ {error}
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Back link */}
      <Link to="/courses" className="btn-ghost d-inline-flex mb-4" style={{ fontSize: '0.85rem' }}>
        ← Back to Courses
      </Link>

      <div className="details-card">
        {/* Top meta row */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
          <span className="details-badge">📘 Course ID: {id}</span>
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-3)',
            background: 'var(--color-surface-2)',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)'
          }}>
            ⏱ 4 Weeks
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-1)',
          lineHeight: 1.3,
          marginBottom: '1.5rem'
        }}>
          {course.title}
        </h1>

        <div className="divider"></div>

        {/* Body */}
        <p style={{
          color: 'var(--color-text-2)',
          fontSize: '1.05rem',
          lineHeight: '1.85',
          marginBottom: '2.5rem'
        }}>
          {course.body}
        </p>

        {/* Info row */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          padding: '1.25rem',
          background: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBottom: '2rem'
        }}>
          {[
            { label: 'Level', value: 'Beginner Friendly' },
            { label: 'Format', value: 'Online, Self-Paced' },
            { label: 'Certificate', value: 'Yes, Included' },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px' }}>{item.label}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-1)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <Link to="/courses" className="btn-primary-custom">
          ← Back to All Courses
        </Link>
      </div>
    </div>
  );
}

export default CourseDetails;
