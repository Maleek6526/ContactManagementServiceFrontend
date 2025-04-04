import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaHome, FaAddressBook, FaExclamationTriangle, FaCog, FaSignOutAlt, FaBars, FaCheckCircle, FaBan } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
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
        <button className={styles.contactVerification} onClick={() => setActiveComponent("numberVerification")}>
          <FaCheckCircle /> {isOpen && "Contact Verification"}
        </button>
        <ul className={styles.navList}>
          <li onClick={() => setActiveComponent("home")}><FaHome /> {isOpen && "Home"}</li>
          <li onClick={() => setActiveComponent("contactList")}><FaAddressBook /> {isOpen && "Contacts"}</li>
          <li onClick={() => setActiveComponent("spamReports")}><FaExclamationTriangle /> {isOpen && "Spam Reports"}</li>
          <li onClick={() => setActiveComponent("blockedContacts")}><FaBan /> {isOpen && "Blocked Contacts"}</li>
          <li onClick={() => setActiveComponent("settings")}><FaCog /> {isOpen && "Settings"}</li>
          <li className={styles.logout} onClick={handleLogout}>
            <FaSignOutAlt /> {isOpen && "Logout"}
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Sidebar;
