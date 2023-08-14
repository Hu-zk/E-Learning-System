import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./student/pages/landing/landing";
import Sidebar from "./student/components/sidebar/Sidebar";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/student">
            <Route index element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
