import React, { useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import NumberVerification from "../Sidebar/NumberVerification";
import ContactList from "../ContactList";
import styles from "./Dashboard.module.css";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
              <Card title="Total Contacts" description="1,234" />
            </motion.div>
            <motion.div className={styles.cardWrapper} whileHover={{ scale: 1.1, rotate: -2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }}>
              <Card title="Spam Reports" description="567" />
            </motion.div>
            <motion.div className={styles.cardWrapper} whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }}>
              <Card title="New Numbers" description="89" />
            </motion.div>
          </motion.div>
        ) : activeComponent === "contactList" ? (
          <ContactList />
        ) : activeComponent === "numberVerification" ? (
          <NumberVerification />
        ) : (
          <div>Component Not Found</div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
