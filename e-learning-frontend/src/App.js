import { Routes, Route } from "react-router-dom";
import TeacherLayout from "./utils/TeacherLayout/TeacherLayout";
import TeacherHome from "./pages/Teacher/Home/TeacherHome";
import Course from "./pages/Teacher/Course/Course";
import Attendance from "./pages/Teacher/Attendance/Attendance";
import Grades from "./pages/Teacher/Grades/Grades";
import Landing from "./pages/Student/landing/landing";
import Home from "./pages/Parent/Home/Home";
import ParentLayout from "./utils/ParentLayout/ParentLayout";
import Login from "./pages/login/login";
import AdminLayout from "./utils/AdminLayout";
import Create from "./pages/Admin/Create";
import Display from "./pages/Admin/Display";
import Settings from "./pages/Admin/Settings";
import StudentLayout from "./utils/StudentLayout/StudentLayout";
import Inprogress from "./pages/Student/inprogress/inprogress";
import Completed from "./pages/Student/completed/completed";
import CoursePage from "./pages/Student/coursePage/CoursePage";
import Statistics from "./pages/Parent/statistics/statistics";
import BookMeeting from "./pages/Parent/meeting/bookmeeting";
import CourseList from "./components/Admin/CourseList";
import StudentList from "./components/Admin/StudentList";
import TeacherList from "./components/Admin/TeacherList";
import ParentList from "./components/Admin/ParentList";
import UserList from "./components/Admin/UsersList";
import { useEffect, useState } from "react";
import { sendRequest } from "./core/config/request";
import { requestMethods } from "./core/enums/requestMethods";

function App() {
  const [mode, setMode] = useState('');

  useEffect(() => {
      const fetchData = async () =>{
          try {
              const response = await sendRequest({
                  route: "/user/shared/get-appearance",
                  method: requestMethods.GET,
              });
              setMode(response)
          } catch (error) {
              console.error('failed:', error);
          }
      }
      fetchData();
  }, []);

  if(mode === "dark"){
    document.documentElement.style.setProperty('--white', "black");
    document.documentElement.style.setProperty('--black', "white");
}else{
    document.documentElement.style.setProperty('--white', "white");
    document.documentElement.style.setProperty('--black', "black");
}
  return (
    <div className="routes dark">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/" element={<h1>Login</h1>} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/create" element={<Create />} />
          <Route path="/admin/display" element={<Display />}>
            <Route path="/admin/display/users" element={<UserList />} />
            <Route path="/admin/display/students" element={<StudentList />} />
            <Route path="/admin/display/teachers" element={<TeacherList />} />
            <Route path="/admin/display/parents" element={<ParentList />} />
            <Route path="/admin/display/courses" element={<CourseList />} />
          </Route>
          <Route path="/admin/settings" element={<Settings mode={mode} setMode={setMode} />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Landing />} />
          <Route path="inprogress" element={<Inprogress />} />
          <Route path="completed" element={<Completed />} />
          <Route path="course/:id/:name" element={<CoursePage />} />
        </Route>

        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherHome />} />
          <Route path="/teacher/course/:id" element={<Course />} />
          <Route
            path="/teacher/course/:id/attendance"
            element={<Attendance />}
          />
          <Route
            path="/teacher/course/:id/assignment/:assignmentId"
            element={<Grades />}
          />
        </Route>

        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<Home />} />
          <Route path="/parent/statistics" element={<Statistics />} />
          <Route path="/parent/bookmeet" element={<BookMeeting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
