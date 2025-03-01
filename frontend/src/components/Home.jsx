import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";

const Home = ({ theme }) => {  // Receive theme as a prop

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="main-container">
      <Navbar theme={theme} /> {/* Ensure Navbar receives theme */}

      {[1, 2, 3].map((_, index) => (
        <div key={index} className={`home-container ${theme}`}>
          <div className="header-container">
            <div className="homeright">
              <h1 className="home-title">Finance Tracker</h1>
              <p className="home-description">
                Take control of your finances! Manage your Dashboard, Incomes, and Expenses efficiently.
              </p>
              <div className="navbar-right">
                <ul className="auth-links">
                  <li><Link to="/login" className="login-btn">Log in</Link></li>
                  <li><Link to="/signup" className="signup-btn">Sign up</Link></li>
                </ul>
              </div>
            </div>

            {/* Finance Tracker Image */}
            <img 
              className="homep"  
              src={theme === "light" ? "/photo2.jpg" : "/photo1.jpg"} 
              alt="Finance Tracker Logo" 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
