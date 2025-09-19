import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Viewer from "./pages/viewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoute roles={["admin", "user"]} />}>
          <Route path="/viewer" element={<Viewer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
