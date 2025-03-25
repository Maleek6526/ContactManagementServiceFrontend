import React from "react";
import { Link } from "react-router-dom";
import styles from "./GuestDashboard.module.css";

const GuestDashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Guest Dashboard</h1>
      <p>Enjoy a limited view of our platform.</p>

      {/* Example of features disabled */}
      <div className={styles.features}>
        <div className={styles.card}>
          <h3>Caller ID</h3>
          <p>Find out who's calling you!</p>
          <button disabled className={styles.disabledBtn}>
            Sign in to Access
          </button>
        </div>

        <div className={styles.card}>
          <h3>Spam Detection</h3>
          <p>Identify and block spam calls.</p>
          <button disabled className={styles.disabledBtn}>
            Sign in to Access
          </button>
        </div>
      </div>

      {/* Encourage Sign-in */}
      <p>
        Want full access? <Link to="/login">Sign in</Link> or <Link to="/register">Create an account</Link>.
      </p>
    </div>
  );
};

export default GuestDashboard;
