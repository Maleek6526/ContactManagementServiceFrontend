import React from "react";
import Sidebar from "../Sidebar/sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>
        <Navbar />
        <div className={styles.cards}>
          <Card title="Total Contacts" description="1,234" />
          <Card title="Spam Reports" description="567" />
          <Card title="New Numbers" description="89" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
