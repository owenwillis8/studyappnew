import React from "react";
import { Link } from "react-router-dom";
import "../components/navbar.css";
import logo from "../assets/logo.png"

interface NavbarProps {
  user: any | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="FlowState logo" className="logo-img" />
        <h1 className="logo-text">FlowState</h1>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/methods">Methods</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {user ? (
          <li className="signed-in">Signed in as {user.email}</li>
        ) : (
          <li className="signed-out">Not signed in</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
