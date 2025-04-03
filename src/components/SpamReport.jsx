import React, { useState, useEffect } from "react";
import styles from "./spamreport.module.css";

const SpamReport = () => {
  const [spamContacts, setSpamContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch spam contacts
  const fetchSpamContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/spam/spam-contacts");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setSpamContacts(data);
      setError("");
    } catch (err) {
      setError("Error fetching spam contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts & refresh every 5 seconds
  useEffect(() => {
    fetchSpamContacts();
    const interval = setInterval(fetchSpamContacts, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Spam Reports</h2>

      {loading && <p className={styles.loading}>Loading spam contacts...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {spamContacts.length > 0 ? (
              spamContacts.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.noData}>No spam reports found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpamReport;
