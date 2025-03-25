import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/spam">Spam List</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
