import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1>TrueCaller Dashboard</h1>
      <div className={styles.user}>
        <span>👤 User</span>
      </div>
    </nav>
  );
};

export default Navbar;
