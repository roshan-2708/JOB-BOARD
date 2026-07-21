import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import DasBoard from './pages/DasBoard';
import JobApplications from './components/JobApplications';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DasBoard />} />
        <Route path='/employer/job/:jobId/applications' element={<JobApplications />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;