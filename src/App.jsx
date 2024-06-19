import Login from './pages/auth/Login'
import { Route, Routes, Navigate } from "react-router-dom";
import Courses from './pages/home/courses/Courses';
import PrivateRoute from './components/Private';
import Dashboard from './pages/home/Dashboard';
import Students from './pages/home/Students';
import Mentors from './pages/home/Mentors';
import Doubts from './pages/home/Doubts';
import Requests from './pages/home/Requests';
import Announcement from './pages/home/Announcement';
import Discussion from './pages/home/Discussion';
import View from './pages/home/courses/View';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from './store/slice/authReducer';

function App() {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  useEffect(()=>{
    dispatch(verifyToken());
  },[])

  return (
    <Routes>
      <Route path="/admin">
        <Route path="home" element={<PrivateRoute />}>
          <Route path="courses" >
            <Route path="" element={<Courses />} />
            <Route path="view" element={<View />} />
          </Route>
          <Route path="" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="doubts" element={<Doubts />} />
          <Route path="requests" element={<Requests />} />
          <Route path="discussion" element={<Discussion />} />
          <Route path="announcement" element={<Announcement />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/" element={<Navigate to="/admin/login" />} />
    </Routes>
  )
}

export default App
