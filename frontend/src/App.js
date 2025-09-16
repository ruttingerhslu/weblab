import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages";
import Admin from "./pages/admin";
import Radar from "./pages/radar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/radar" element={<Radar />} />
      </Routes>
    </Router>
  );
}

export default App;
