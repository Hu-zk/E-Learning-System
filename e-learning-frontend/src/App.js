import { Routes, Route } from "react-router-dom"
import TeacherLayout from "./utils/TeacherLayout/TeacherLayout";
import TeacherHome from "./pages/Teacher/Home/TeacherHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Login</h1>} />
      <Route path="/register" element={<h1>Register</h1>} />
      <Route path="/admin">
        <Route index element={<h1>Admin</h1>} />
      </Route>
      <Route path="/student">
        <Route index element={<h1>Student</h1>} />
      </Route>
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherHome />} />
      </Route>
      <Route path="/parent">
        <Route index element={<h1>Parent</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
