import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import DashBoard from './pages/DashBoard';
import JobApplications from './components/JobApplications';
import Companies from './pages/Companies';
import UpdateJob from './components/UpdateJob';
import FindJobs from './pages/FindJobs';
import JobDeatils from './pages/JobDeatils';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path='/companies' element={<Companies />} />
        <Route path='/employer/job/update/:jobId' element={<UpdateJob />} />
        <Route path='/Jobs' element={<FindJobs />} />
        <Route path='/job/:jobId' element={<JobDeatils />} />
        <Route path='/employer/job/:jobId/applications' element={<JobApplications />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;