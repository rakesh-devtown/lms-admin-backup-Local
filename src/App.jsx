import Login from './pages/auth/Login'
import { Route, Routes, Navigate } from "react-router-dom";
import Courses from './pages/home/Courses';
import PrivateRoute from './components/Private';
import Dashboard from './pages/home/Dashboard';
import Certificate from './pages/home/Certificate';
import Feedback from './pages/home/Feedback';
import MentorProfile from './pages/home/MentorProfile';
import Mentor from './pages/home/Mentor';
function App() {
  return (
    <Routes>
      <Route path="/admin">
        <Route path="home" element={<PrivateRoute />}>
          <Route path="courses" element={<Courses />} />
          <Route path="" element={<Dashboard />} />
          <Route path="certificate" element={<Certificate />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="mentor_profile" element={<MentorProfile />} />
          <Route path="mentor" element={<Mentor />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/" element={<Navigate to="/admin/login" />} />
    </Routes>
  )
}

export default App
