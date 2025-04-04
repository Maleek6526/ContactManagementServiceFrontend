import React, { useState, useEffect} from "react";
import Sidebar from "../Sidebar/sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import NumberVerification from "../Sidebar/NumberVerification";
import ContactList from "../ContactList";
import BlockedContacts from "../BlockedContact";
import styles from "./Dashboard.module.css";
import SpamReport from "../SpamReport";
import Settings from "../Settings";
import { motion } from "framer-motion";
import axios from "axios";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contactCount, setContactCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);

  useEffect(() => {
    const fetchContactCount = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.userId) {
          const response = await fetch(`http://localhost:8080/api/users/contact/count/${user.userId}`);
          const responseForBlocked = await fetch(`http://localhost:8080/api/users/contact/countBlockedNumbers/${user.userId}`);
          const responseForBlockedNumbers = await responseForBlocked.json();
          const count = await response.json();
          setContactCount(count);
          setBlockedCount(responseForBlockedNumbers);
        }
      } catch (error) {
        console.error("Failed to fetch contact count:", error);
      }
    };
  
    fetchContactCount();
  
    const interval = setInterval(fetchContactCount, 10000);
  
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.dashboard}>
      <Sidebar setActiveComponent={setActiveComponent} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`${styles.content} ${isSidebarOpen ? styles.contentShift : ""}`}>
        <Navbar />
        
        {activeComponent === "home" ? (
          <motion.div 
            className={styles.cards} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <motion.div className={styles.cardWrapper} whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }}>
              <Card title="Total Contacts" description={contactCount.toString()} />
            </motion.div>
            <motion.div className={styles.cardWrapper} whileHover={{ scale: 1.1, rotate: -2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }}>
              <Card title="Spam Reports" description="1" />
            </motion.div>
            <motion.div className={styles.cardWrapper} whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }}>
              <Card title="Blocked Contacts" description={blockedCount.toString()} />
            </motion.div>
          </motion.div>
        ) : activeComponent === "contactList" ? (
          <ContactList />
        ) :activeComponent === "spamReports" ? (
          <SpamReport />
        ): activeComponent === "numberVerification" ? (
          <NumberVerification />
        ) : activeComponent === "blockedContacts" ? (
          <BlockedContacts />
        ): activeComponent === "settings" ? (
          <Settings />
        ) : (
          <div>Component Not Found</div>
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
