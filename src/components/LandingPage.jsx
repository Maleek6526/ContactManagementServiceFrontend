import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Welcome to My Contact Management Service</h1>
        <p className={styles.subtitle}>Your comfort, our priority. Join us today!</p>
      </div>
      
      <div className={styles.buttonContainer}>
        <Link to="/register">
          <button className={styles.button}>Register</button>
        </Link>
        <Link to="/login">
          <button className={styles.button}>Log In</button>
        </Link>
        <Link to="/guest">
          <button className={styles.guestButton}>Continue as Guest</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;