import React, { useState, useEffect } from "react";  
import styles from "./ContactList.module.css";  

const ContactList = () => {  
  const [contacts, setContacts] = useState([]);  
  const [searchTerm, setSearchTerm] = useState("");  
  const [selectedContacts, setSelectedContacts] = useState([]);  
  const [selectAll, setSelectAll] = useState(false);  
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [blockedContacts, setBlockedContacts] = useState([]);
  const [updateContact, setUpdateContact] = useState({
  userEmail: "",
  oldPhoneNumber: "",
  newName: "",
  newPhoneNumber: "",
  newEmail: "",
  });
  const [newContact, setNewContact] = useState({  
    userEmail: "",  
    name: "",  
    email: "",  
    phoneNumber: ""  
  });  
  const [showForm, setShowForm] = useState(false);  
  const [message, setMessage] = useState("");  

  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlockClick = () => {
    setIsBlocked(true);
  };

  const isValidPhoneNumber = (phoneNumber) => /^(?:\+234|0)(70|80|81|90|91)[0-9]{8}$/.test(phoneNumber);  
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);  

  useEffect(() => {  
    fetchContacts();  
  }, []);  

  const fetchContacts = () => {  
    const userData = JSON.parse(localStorage.getItem("user"));  
    if (!userData) {  
      console.error("No user data found in localStorage.");  
      return;  
    }  

    const userEmail = userData.userId;  
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
        if (!Array.isArray(data)) {  
          console.error("Invalid data format received:", data);  
          return;  
        }  
        setContacts(data);  
      })  
      .catch((error) => console.error("Error fetching contacts:", error));  
  };  

  const handleUpdateClick = (contact) => {
    setUpdateContact({
      userEmail: JSON.parse(localStorage.getItem("user")).userId,
      oldPhoneNumber: contact.phoneNumber,
      newName: contact.name || "",
      newPhoneNumber: "",
      newEmail: contact.email || "",
    });
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = () => {
    if (!updateContact.newPhoneNumber) {
      alert("New phone number is required.");
      return;
    }

    if (updateContact.oldPhoneNumber === updateContact.newPhoneNumber) {
      alert("New phone number must be different from the old phone number.");
      return;
    }


    fetch("http://localhost:8080/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateContact),
    })
      .then((response) => response.json())
      .then(() => {
        fetchContacts();
        setShowUpdateForm(false);
      })
      .catch((error) => console.error("Error updating contact:", error));
  };
  const handleSearch = (e) => {  
    setSearchTerm(e.target.value);  
  };  

  const handleSelect = (id) => {  
    setSelectedContacts((prev) =>  
      prev.includes(id) ? prev.filter((contactId) => contactId !== id) : [...prev, id]  
    );  
  };  

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateContact((prev) => ({ ...prev, [name]: value }));
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
    const userData = JSON.parse(localStorage.getItem("user"));  
    const userId = userData?.userId;  
  
    if (!userId) {  
      console.error("No user ID found.");  
      return;  
    }  
  
    if (selectedContacts.length === 0 && !selectAll) {  
      setMessage("No contacts selected to delete.");  
      return;  
    }  
  
    const selectedPhoneNumbers = contacts
      .filter(contact => selectedContacts.includes(contact.id))
      .map(contact => contact.phoneNumber);
  
    const requestBody = {
      userEmail: userId, 
      phoneNumbers: selectedPhoneNumbers
    };
  
    console.log("Request Body:", requestBody);
  
    if (selectAll) {  
      fetch(`http://localhost:8080/api/users/delete-all/${userId}`, {  
        method: "DELETE"  
      })  
        .then((response) => {  
          if (!response.ok) {  
            throw new Error(`HTTP error! Status: ${response.status}`);  
          }  
          return response.json();  
        })  
        .then((data) => {  
          setMessage(data.message || "All contacts deleted successfully.");  
          fetchContacts();  
          setSelectedContacts([]);  
          setSelectAll(false);  
        })  
        .catch((error) => {  
          console.error("Error deleting contacts:", error);  
          setMessage("Error deleting contacts.");  
        });  
    } else if (selectedContacts.length > 0) {  
      fetch(`http://localhost:8080/api/users/delete`, {  
        method: "DELETE",  
        headers: {  
          "Content-Type": "application/json"  
        },  
        body: JSON.stringify(requestBody)  
      })  
      .then((response) => {  
        if (!response.ok) {  
          throw new Error(`HTTP error! Status: ${response.status}`);  
        }  
        return response.json();  
      })  
      .then((data) => {  
        console.log("Delete Response:", data);  
  
        if (!data.userEmail || !Array.isArray(data.phoneNumbers)) {
          throw new Error("Invalid response format from server.");
        }
  
        setMessage(`Deleted contacts for ${data.userEmail}.`);  
        fetchContacts();  
      })  
      .catch((error) => {  
        console.error("Error deleting contacts:", error);  
        setMessage("Error deleting contacts.");  
      });
    }  
  };




  const handleBlockContact = async (phoneNumber) => {
    setBlockedContacts((prev) => ({
      ...prev,
      [phoneNumber]: true,
    }));
  
    const userData = JSON.parse(localStorage.getItem("user"));
    const userEmail = userData?.userId;
  
    if (!userEmail) {
      console.error("No user email found.");
      return;
    }
  
    const requestBody = {
      userEmail,
      phoneNumber,
    };
  
    try {
      const response = await fetch("http://localhost:8080/block/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Block Response:", data);
    } catch (error) {
      console.error("Error blocking contact:", error);
    }
  };
  

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setNewContact((prev) => ({  
      ...prev,  
      [name]: value  
    }));  
  };  

  const handleAddContact = () => {  
    const userData = JSON.parse(localStorage.getItem("user"));  
    const userEmail = userData?.userId;  

    if (!userEmail) {  
      console.error("No user email found.");  
      return;  
    }  

    if (!isValidEmail(newContact.email)) {  
      alert("Please enter a valid email address.");  
      return;  
    }  

    if (!isValidPhoneNumber(newContact.phoneNumber)) {  
      alert("Please enter a valid phone number (10 digits only).");  
      return;  
    }  

    const contactData = {  
      userEmail: userEmail,  
      name: newContact.name,  
      email: newContact.email,  
      phoneNumber: newContact.phoneNumber  
    };  

    fetch("http://localhost:8080/api/users/add-contact", {  
      method: "POST",  
      headers: {  
        "Content-Type": "application/json"  
      },  
      body: JSON.stringify(contactData)  
    })  
      .then((response) => {  
        if (!response.ok) {  
          throw new Error(`HTTP error! Status: ${response.status}`);  
        }  
        return response.json();  
      })  
      .then(() => {  
        fetchContacts(); 
        setNewContact({ userEmail: "", name: "", email: "", phoneNumber: "" });  
        setShowForm(false);
      })  
      .catch((error) => console.error("Error adding contact:", error));  
  };  

  const filteredContacts = contacts.filter(  
    (contact) =>  
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||  
      contact.phoneNumber?.includes(searchTerm) ||  
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase().trim())  
  );  

  return (  
    <div className={styles.container}>  
      <h2>Contacts</h2>  
      {message && <p className={styles.message}>{message}</p>} {}
      <input  
        type="text"  
        placeholder="Search contacts..."  
        value={searchTerm}  
        onChange={handleSearch}  
        className={styles.searchInput}  
      />  
      <button   
        className={styles.addButton}   
        onClick={() => setShowForm(!showForm)}  
      >  
        {showForm ? "Cancel" : "Add Contact"}  
      </button>  

      {showForm && (  
        <div className={styles.formContainer}>  
          <input  
            type="text"  
            name="name"  
            placeholder="Name"  
            value={newContact.name}  
            onChange={handleInputChange}  
            required  
            className={styles.formInput}  
          />  
          <input  
            type="email"  
            name="email"  
            placeholder="Email"  
            value={newContact.email}  
            onChange={handleInputChange}  
            required  
            className={styles.formInput}  
          />  
          <input  
            type="tel"  
            name="phoneNumber"  
            placeholder="Phone Number"  
            value={newContact.phoneNumber}  
            onChange={handleInputChange}  
            required  
            className={styles.formInput}  
          />  
          <button onClick={handleAddContact} className={styles.submitButton}>Submit</button>  
        </div>  
      )}  

      <button   
        className={styles.deleteButton}   
        onClick={handleDelete}   
        disabled={selectedContacts.length === 0}  
      >  
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
                <td>{contact.spam ? "Yes" : "No"}</td>  
                <td>  
                <button className={styles.updateButton} onClick={() => handleUpdateClick(contact)}>Update</button>
                  <button 
    className={styles.blockbutton} 
    onClick={() => handleBlockContact(contact.phoneNumber)}
    disabled={blockedContacts[contact.phoneNumber]}
  >
    {blockedContacts[contact.phoneNumber] ? "Blocked" : "Block"}
  </button>
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      )}  

      {showUpdateForm && (
        <div className={styles.updateFormContainer}>
          <h3>Update Contact</h3>
          <input type="text" name="newName" placeholder="New Name" value={updateContact.newName} onChange={handleUpdateChange} className={styles.formInput} />
          <input type="email" name="newEmail" placeholder="New Email" value={updateContact.newEmail} onChange={handleUpdateChange} className={styles.formInput} />
          <input type="tel" name="newPhoneNumber" placeholder="New Phone Number" value={updateContact.newPhoneNumber} onChange={handleUpdateChange} className={styles.formInput} />
          <button 
      onClick={() => {
        if (!isValidEmail(updateContact.newEmail)) {
          alert("Please enter a valid email address.");
          return;
        }
        if (!isValidPhoneNumber(updateContact.newPhoneNumber)) {
          alert("Please enter a valid Nigerian phone number.");
          return;
        }
        handleUpdateSubmit();
      }} 
      className={styles.submitButton}
    >
      Submit
    </button>
    <button onClick={() => setShowUpdateForm(false)} className={styles.cancelButton}>
      Cancel
    </button>
  </div>
      )}

    </div>  
  );  
};  

export default ContactList;  