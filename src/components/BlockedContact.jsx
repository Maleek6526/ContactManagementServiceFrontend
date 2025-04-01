import React, { useEffect, useState, useRef } from "react";
import styles from "./blockedcontact.module.css";

const BlockedContacts = () => {
  const [state, setState] = useState({
    blockedContacts: [],
    loading: true,
    error: null,
  });
  const intervalRef = useRef(null);
  const [unblocking, setUnblocking] = useState({}); 

  const fetchBlockedContacts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) {
        throw new Error("User not found in localStorage.");
      }

      const response = await fetch(`http://localhost:8080/block/list/${user.userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const contacts = data.blockedContacts;

      if (!Array.isArray(contacts)) {
        throw new Error("Invalid data format");
      }

      setState({ blockedContacts: contacts, loading: false, error: null });
    } catch (error) {
      setState({ blockedContacts: [], loading: false, error: error.message });
    }
  };
  


  const handleUnblock = async (phoneNumber) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) {
        throw new Error("User email not found in localStorage.");
      }
  
      const response = await fetch(`http://localhost:8080/block/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.userId,  // ✅ Fix: Use `userEmail` instead of `userId`
          phoneNumber: phoneNumber,  // ✅ Make sure this is the phone number
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      setState((prevState) => ({
        ...prevState,
        blockedContacts: prevState.blockedContacts.filter(
          (contact) => contact.phoneNumber !== phoneNumber
        ),
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };
  

  useEffect(() => {
    fetchBlockedContacts();

    // Auto-refresh every 30 seconds
    intervalRef.current = setInterval(fetchBlockedContacts, 30000);
    return () => clearInterval(intervalRef.current); // Clear interval on cleanup
  }, []);

  return (
    <div className={styles.container}>
      <h2>Blocked Contacts</h2>

      {state.loading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p className={styles.error}>{state.error}</p>
      ) : state.blockedContacts.length > 0 ? (
<ul className={styles.list}>
  {state.blockedContacts.map((contact, index) => (
    <li key={`${contact.phoneNumber}-${index}`} className={styles.contactItem}>
      <span className={styles.name}>{contact.name}</span>
      <span className={styles.phone}>{contact.phoneNumber}</span>
      <span className={styles.email}>{contact.email}</span>
      <button
        className={styles.unblockButton}
        onClick={() => handleUnblock(contact.phoneNumber)}
      >
        Unblock
      </button>
    </li>
  ))}
</ul>
      ) : (
        <p>No blocked contacts found.</p>
      )}
    </div>
  );
};

export default BlockedContacts;
