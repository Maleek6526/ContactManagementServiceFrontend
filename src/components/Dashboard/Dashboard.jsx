import React from "react";
import Sidebar from "../Sidebar/sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import styles from "./Dashboard.module.css";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>
        <Navbar />
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
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
