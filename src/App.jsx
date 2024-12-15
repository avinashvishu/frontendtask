import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./components/logIn";
import SignUp from "./components/signUp";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
