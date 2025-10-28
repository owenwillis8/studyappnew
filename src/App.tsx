import React from "react";
import "./index.css";
import logo from "./assets/logo.png"; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Flow State logo" className="logo-img" />
        <h1 className="logo-text">Flow State</h1>
      </div>

      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};


const LandingPage: React.FC = () => {
  return (
    <section className="hero">
      <h2>Find Your Flow</h2>
      <p>Guided study sessions that help you stay focused and productive.</p>
      <button className="cta">Get Started</button>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
    </div>
  );
};

export default App;

