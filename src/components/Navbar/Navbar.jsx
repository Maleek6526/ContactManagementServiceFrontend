import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.userId || "Guest");
    }
  }, []);

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={styles.logo}>TrueCaller Dashboard</h1>
      <div className={styles.userSection}>
        <FaUserCircle className={styles.userIcon} />
        <span className={styles.username}>{username}</span>
      </div>
    </motion.nav>
  );
};

export default Navbar;