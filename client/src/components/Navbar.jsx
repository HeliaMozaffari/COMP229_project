// client/src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <div style={styles.logoCircle}>BN</div>
        <span style={styles.title}>BookNest Library</span>
      </div>

      <nav style={styles.nav}>
        <Link to="/" className={isActive("/")}>
          Home
        </Link>
        <Link to="/books/admin" className={isActive("/books/admin")}>
          Manage Books
        </Link>
        <Link to="/signin" className={isActive("/signin")}>
          Sign In
        </Link>
        <Link to="/signup" className={isActive("/signup")}>
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#1a1b2e",
    color: "#fff",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: "#1a1b2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "1rem",
  },
};

export default Navbar;
