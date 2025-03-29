import React, { useState, useEffect } from "react";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      console.error("No user data found in localStorage.");
      return;
    }
  
    const userEmail = userData?.userId;
    if (!userEmail) {
      console.error("No user email found in userData.");
      return;
    }
  
    console.log("Fetching contacts for:", userEmail);
  
    fetch(`http://localhost:8080/api/users/view/${userEmail}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched contacts:", data);
        
        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error("Invalid data format received:", data);
          return;
        }
  
        setContacts(data);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = () => {
    setContacts(contacts.filter((contact) => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
    setSelectAll(false);
    fetchContacts(); // Refresh contacts after deletion
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      contact.phoneNumber?.includes(searchTerm) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
  
  console.log("Filtered Contacts:", filteredContacts);
  

  console.log("Filtered Contacts:", filteredContacts);

  return (
    <div className={styles.container}>
      <h2>Contacts</h2>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <button className={styles.addButton}>Add Contact</button>
      <button className={styles.deleteButton} onClick={handleDelete} disabled={selectedContacts.length === 0}>
        Delete Selected
      </button>
      {contacts.length === 0 ? (
        <p>Contact list is empty</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                Select All
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Added By</th>
              <th>Spam</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleSelect(contact.id)}
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.addedBy}</td>
                <td>{contact.spam ? "Yes" : "No"}</td>
                <td>
                  <button className={styles.updateButton}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactList;
