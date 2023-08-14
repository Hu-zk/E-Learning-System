import { Routes, Route } from "react-router-dom";
import TeacherLayout from "./utils/TeacherLayout/TeacherLayout";
import TeacherHome from "./pages/Teacher/Home/TeacherHome";
import Course from "./pages/Teacher/Course/Course";
import Attendance from "./pages/Teacher/Attendance/Attendance";
import Grades from "./pages/Teacher/Grades/Grades";
import Landing from "./pages/Student/landing/landing";
import Login from "./pages/login/login";

function App() {
  return (
    <div className="routes dark">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<h1>Register</h1>} />

        <Route path="/admin">
          <Route index element={<h1>Admin</h1>} />
        </Route>

        <Route path="/student">
          <Route index element={<Landing />} />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherHome />} />
          <Route path="/teacher/course/:id" element={<Course />} />
          <Route
            path="/teacher/course/:id/attendance"
            element={<Attendance />}
          />
          <Route
            path="/teacher/course/:id/assignment/:id"
            element={<Grades />}
          />
        </Route>

        <Route path="/parent">
          <Route index element={<h1>Parent</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
