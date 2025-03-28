import React from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaTwitter, FaWhatsapp, FaTelegram, FaLinkedin, FaInstagram, FaFacebook, FaSnapchat, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} TrueCaller Clone</p>
      <div className={styles.socialIcons}>
        <a href="#" className={styles.icon} aria-label="GitHub"><FaGithub /></a>
        <a href="#" className={styles.icon} aria-label="Twitter"><FaTwitter /></a>
        <a href="#" className={styles.icon} aria-label="WhatsApp"><FaWhatsapp /></a>
        <a href="#" className={styles.icon} aria-label="Telegram"><FaTelegram /></a>
        <a href="#" className={styles.icon} aria-label="LinkedIn"><FaLinkedin /></a>
        <a href="#" className={styles.icon} aria-label="Instagram"><FaInstagram /></a>
        <a href="#" className={styles.icon} aria-label="Facebook"><FaFacebook /></a>
        <a href="#" className={styles.icon} aria-label="Snapchat"><FaSnapchat /></a>
        <a href="#" className={styles.icon} aria-label="Email"><FaEnvelope /></a>
      </div>
    </footer>
  );
};

export default Footer;
