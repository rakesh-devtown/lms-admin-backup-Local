import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { verifyToken } from "./store/slice/authReducer";
import Login from "./pages/auth/Login";
import Courses from "./pages/home/courses/Courses";
import PrivateRoute from "./components/Private";
import Dashboard from "./pages/home/Dashboard";
import Students from "./pages/home/Students";
import Mentors from "./pages/home/Mentors";
import Doubts from "./pages/home/Doubts";
import Requests from "./pages/home/Requests";
import Announcement from "./pages/home/Announcement";
import Discussion from "./pages/home/Discussion";
import View from "./pages/home/courses/View";
import CertificateView from "./components/View/Certificate";
import ActivitiesView from "./components/View/Activities";
import DiscussionView from "./components/View/Discussion";
import StudentsView from "./components/View/Students";
import MainView from "./components/View/Main";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <Routes>
      <Route path="admin/login" element={<Login />} />
      <Route path="admin" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path="courses">
          <Route index element={<Courses />} />
          <Route path="view" element={<View />}>
            <Route index element={<MainView />} />
            <Route path="certificate" element={<CertificateView />} />
            <Route path="activities" element={<ActivitiesView />} />
            <Route path="discussion" element={<DiscussionView />} />
            <Route path="students" element={<StudentsView />} />
          </Route>
        </Route>
        <Route path="students" element={<Students />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="doubts" element={<Doubts />} />
        <Route path="requests" element={<Requests />} />
        <Route path="discussion" element={<Discussion />} />
        <Route path="announcement" element={<Announcement />} />
      </Route>
      <Route path="/" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
}

export default App;
