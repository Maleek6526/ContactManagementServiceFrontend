import React, { useState } from "react";
import styles from "./NumberVerification.module.css";

const NumberVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Contact Verification</h2>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d+]/g, ""))}
        className={styles.inputField}
      />
      <button onClick={handleLookup} className={styles.verifyBtn}>
        Verify Number
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {result && (
        <div className={styles.resultCard}>
          <h4>Lookup Result</h4>
          <p><strong>Number:</strong> {result.international_format}</p>
          <p><strong>Local Format:</strong> {result.local_format}</p>
          <p><strong>Country:</strong> {result.country_name} ({result.country_code})</p>
          <p><strong>Carrier:</strong> {result.carrier}</p>
          <p><strong>Line Type:</strong> {result.line_type}</p>
        </div>
      )}
    </div>
  );
};

export default NumberVerification;