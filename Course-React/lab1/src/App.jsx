import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoursesLayout from './pages/CoursesLayout';
import CoursesList from './pages/CoursesList';
import AddCourse from './pages/AddCourse';
import CourseDetails from './pages/CourseDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <CustomNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesLayout />}>
              <Route index element={<CoursesList />} />
              <Route path="add" element={<AddCourse />} />
              <Route path=":id" element={<CourseDetails />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
