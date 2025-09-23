import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router";

import Home from "./pages";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Viewer from "./pages/viewer";

function App() {
  return (
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
  );
}

export default App;
