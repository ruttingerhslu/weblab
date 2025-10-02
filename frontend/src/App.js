import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router";

import Home from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Viewer from "./pages/Viewer";
import About from "./pages/About";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  const hideNavbar = ["/login", "/forbidden"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoute roles={["admin", "user"]} />}>
          <Route path="/viewer" element={<Viewer />} />
        </Route>
        <Route element={<ProtectedRoute roles={["admin", "user"]} />}>
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
