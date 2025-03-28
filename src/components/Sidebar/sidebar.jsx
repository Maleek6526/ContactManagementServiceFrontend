import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { FaHome, FaAddressBook, FaExclamationTriangle, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.sidebarContainer}>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <motion.div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
      >
        <ul className={styles.navList}>
          <li><FaHome /> {isOpen && "Home"}</li>
          <li><FaAddressBook /> {isOpen && "Contacts"}</li>
          <li><FaExclamationTriangle /> {isOpen && "Spam Reports"}</li>
          <li><FaCog /> {isOpen && "Settings"}</li>
          <li className={styles.logout}><FaSignOutAlt /> {isOpen && "Logout"}</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Sidebar;
