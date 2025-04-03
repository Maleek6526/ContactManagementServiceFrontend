import React, { useState } from "react";
import styles from "./settings.module.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle(styles.darkMode);
  };

  return (
    <div className={styles.settingsContainer}>
      <h2>Settings</h2>
      <button className={styles.button}>Change Password</button>
      <button className={styles.button} onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <button className={styles.button}>Change Email</button>
      <button className={styles.button}>Close Account</button>
    </div>
  );
};

export default Settings;
