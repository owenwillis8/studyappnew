import React from "react";
import "./index.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">FlowState</h1>
      <ul className="nav-links">
        <li><a href="#Study Methods">Study Methods</a></li>
        <li><a href="#account">Account</a></li>
        <li><a href="#about">About</a></li>
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

