import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import GuestN from "./components/GuestN";  // ✅ Import Guest Navbar
import Navbar from "./components/Navbar";  // ✅ Import User Navbar
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Income from "./components/Incomes";
import Expenses from "./components/Expenses";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TransactionHistory from "./components/TransactionHistory";
import Bills from './components/Bills'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <MainContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

function MainContent({ theme, toggleTheme }) {
  const isLoggedIn = !!localStorage.getItem("token"); // ✅ Check login status

  return (
    <>
      {isLoggedIn ? (
        <Navbar theme={theme} toggleTheme={toggleTheme} /> // ✅ Pass theme props
      ) : (
        <GuestN theme={theme} toggleTheme={toggleTheme} /> // ✅ Pass theme props
      )}

      <div className="container">
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incomes" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/bills" element={<Bills />} /> 
        </Routes>
      </div>
    </>
  );
}

export default App;
