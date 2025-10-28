import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./index.css";
import logo from "./assets/logo.png"; 
import Features from "./pages/Features";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Flow State logo" className="logo-img" />
        <h1 className="logo-text">FlowState</h1>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/methods">Methods</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};


const LandingPage: React.FC = () => {
  return (
    <section className="hero">
      <h2>Find Your Flow</h2>
      <p>Guided study sessions that help you stay focused and productive.</p>
      <Link to="/methods">
      <button className="cta">Get Started</button>
      </Link>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/methods" element={<Features />} />
      </Routes>
    </>
  );
};

export default App;

