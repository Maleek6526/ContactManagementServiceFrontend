import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./GuestDashboard.module.css";

const MAX_GUEST_ATTEMPTS = 5;

const GuestDashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [guestAttempts, setGuestAttempts] = useState(0);

  useEffect(() => {
    localStorage.setItem("guestAttempts", "0");
    setGuestAttempts(0);
  }, []);

  const formatPhoneNumber = (number) => {
    number = number.trim();

    if (number.startsWith("+234") && number.length === 14) {
      return number;
    }

    if (number.startsWith("234") && number.length === 13) {
      return "+" + number;
    }

    if (number.startsWith("0") && number.length === 11) {
      return "+234" + number.substring(1);
    }

    throw new Error("Invalid phone number format");
  };

  const handleLookup = async () => {
    if (guestAttempts >= MAX_GUEST_ATTEMPTS) {
      setError("Guest mode limit reached. Please log in to continue.");
      return;
    }

    if (!phoneNumber) {
      setError("Please enter a phone number.");
      return;
    }

    try {
      setError("");
      const formattedNumber = formatPhoneNumber(phoneNumber);
      const response = await fetch(
        `http://localhost:8080/contact-verification/${formattedNumber}`
      );
      const data = await response.json();

      if (!data.valid) {
        setError("Number doesn't exist.");
        setResult(null);
      } else {
        setResult(data);
        const newAttempts = guestAttempts + 1;
        setGuestAttempts(newAttempts);
        localStorage.setItem("guestAttempts", newAttempts);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to the Guest Dashboard</h1>
      <p>Enjoy a limited view of our platform.</p>

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

      <div className={styles.lookupSection}>
        <h3>Lookup a Phone Number</h3>
        <p>You have {MAX_GUEST_ATTEMPTS - guestAttempts} attempts left.</p>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(e.target.value.replace(/[^\d+]/g, ""))
          }
          className={styles.inputField}
        />
        <button
          onClick={handleLookup}
          className={styles.lookupBtn}
          disabled={guestAttempts >= MAX_GUEST_ATTEMPTS}
        >
          Check Number
        </button>
        {error && <p className={styles.error}>{error}</p>}
        {result && (
          <div className={styles.resultCard}>
            <h4>Lookup Result</h4>
            <p>
              <strong>Number:</strong> {result.international_format}
            </p>
            <p>
              <strong>Local Format:</strong> {result.local_format}
            </p>
            <p>
              <strong>Country:</strong> {result.country_name} (
              {result.country_code})
            </p>
            <p>
              <strong>Carrier:</strong> {result.carrier}
            </p>
            <p>
              <strong>Line Type:</strong> {result.line_type}
            </p>
            <p>
              <strong>Country Prefix:</strong> {result.country_prefix}
            </p>
          </div>
        )}
      </div>

      <p>
        Want full access? <Link to="/login">Sign in</Link> or{" "}
        <Link to="/register">Create an account</Link>.
      </p>
    </div>
  );
};

export default GuestDashboard;
