import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./student/pages/landing/landing";

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
