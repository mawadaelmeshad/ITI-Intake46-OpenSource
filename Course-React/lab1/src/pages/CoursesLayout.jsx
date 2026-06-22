import { Outlet, NavLink } from 'react-router-dom';

function CoursesLayout() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      {/* Page Header */}
      <div className="text-center mb-5">
        <span className="section-badge">📚 Our Catalog</span>
        <h2 className="fw-bold mt-2" style={{ fontSize: '2.2rem', letterSpacing: '-0.02em' }}>
          Courses <span className="gradient-text">Dashboard</span>
        </h2>
      </div>

      {/* Sub Navigation */}
      <div className="d-flex justify-content-center mb-5">
        <div className="sub-nav-bar">
          <NavLink to="/courses" end className="sub-nav-link">
            All Courses
          </NavLink>
          <NavLink to="/courses/add" className="sub-nav-link">
            + Add Course
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default CoursesLayout;
