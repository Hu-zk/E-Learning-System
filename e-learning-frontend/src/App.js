import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./student/pages/landing/landing";
import Sidebar from "./student/components/sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student">
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
