import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import {
  FaHome,
  FaAddressBook,
  FaExclamationTriangle,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to detect mouse movement near the left side
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX <= 50) {
        setIsOpen(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <motion.div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      initial={{ x: -200 }}
      animate={{ x: isOpen ? 0 : -200 }}
      transition={{ duration: 0.5 }}
    >
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <ul className={styles.navList}>
        <li>
          <FaHome /> {isOpen && "Home"}
        </li>
        <li>
          <FaAddressBook /> {isOpen && "Contacts"}
        </li>
        <li>
          <FaExclamationTriangle /> {isOpen && "Spam Reports"}
        </li>
        <li>
          <FaCog /> {isOpen && "Settings"}
        </li>
        <li className={styles.logout} onClick={handleLogout}>
          <FaSignOutAlt /> {isOpen && "Logout"}
        </li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
