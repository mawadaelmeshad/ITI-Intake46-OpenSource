import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

function AddCourse() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    axios.post('https://jsonplaceholder.typicode.com/posts', data)
      .then(() => {
        setSuccessMessage('Course added successfully!');
        reset();
        setIsSubmitting(false);
        setTimeout(() => setSuccessMessage(''), 4000);
      })
      .catch(err => {
        console.error("Error adding course", err);
        setIsSubmitting(false);
      });
  };

  const fields = [
    {
      name: 'title',
      label: 'Course Title',
      type: 'input',
      placeholder: 'e.g. React for Beginners',
      rules: { required: 'Title is required', minLength: { value: 3, message: 'Min 3 characters required' } }
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'input',
      placeholder: 'e.g. 4 Weeks',
      rules: { required: 'Duration is required' }
    },
    {
      name: 'instructor',
      label: 'Instructor Name',
      type: 'input',
      placeholder: 'e.g. Jane Smith',
      rules: { required: 'Instructor is required', minLength: { value: 3, message: 'Min 3 characters required' } }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Describe what students will learn in this course...',
      rules: { required: 'Description is required', minLength: { value: 10, message: 'Min 10 characters required' } }
    },
  ];

  return (
    <div className="form-card">
      {/* Header */}
      <div className="mb-5">
        <span className="section-badge">✏️ New Entry</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.75rem' }}>
          Add a New <span className="gradient-text">Course</span>
        </h2>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Fill in the details below to publish a new course to the platform.
        </p>
      </div>

      {successMessage && (
        <div className="success-banner">
          <span>✅</span> {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ name, label, type, placeholder, rules }) => (
          <div key={name} style={{ marginBottom: '1.5rem' }}>
            <label className="form-label-custom">{label}</label>
            {type === 'textarea' ? (
              <textarea
                rows="4"
                placeholder={placeholder}
                className={`form-input-custom${errors[name] ? ' error' : ''}`}
                {...register(name, rules)}
              />
            ) : (
              <input
                type="text"
                placeholder={placeholder}
                className={`form-input-custom${errors[name] ? ' error' : ''}`}
                {...register(name, rules)}
              />
            )}
            {errors[name] && (
              <div className="form-error-msg">
                <span>⚠</span> {errors[name].message}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary-custom w-100 justify-content-center mt-2"
          style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Course →'}
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
