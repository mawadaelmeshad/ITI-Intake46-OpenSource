import Header from './components/Header';
import Hero from './components/Hero';
import CourseCard from './components/CourseCard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Hero />
        <div className="container d-flex justify-content-center">
          <CourseCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
