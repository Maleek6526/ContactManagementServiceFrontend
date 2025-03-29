import React from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaTwitter, FaWhatsapp, FaTelegram, FaLinkedin, FaInstagram, FaFacebook, FaSnapchat, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.ptag}>&copy; {new Date().getFullYear()} TrueCaller Clone</p>
      <p className={styles.helpText}>Need any help?</p>
      <div className={styles.socialIcons}>
        <a href="https://github.com" className={styles.icon} aria-label="GitHub"><FaGithub /></a>
        <a href="https://twitter.com" className={styles.icon} aria-label="Twitter"><FaTwitter /></a>
        <a 
          href="https://api.whatsapp.com/send?phone=2347025284621" 
          className={styles.icon} 
          aria-label="WhatsApp (7025284621)"
        >
          <FaWhatsapp />
        </a>

        <a 
          href="https://t.me/+2347025284621" 
          className={styles.icon} 
          aria-label="Telegram"
        >
          <FaTelegram />
        </a>
        <a 
          href="https://www.instagram.com/direct/inbox/" 
          className={styles.icon} 
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a 
          href="https://m.me/petersings" 
          className={styles.icon} 
          aria-label="Facebook Messenger"
        >
          <FaFacebook />
        </a>
        <a 
          href="https://www.snapchat.com/add/maleek" 
          className={styles.icon} 
          aria-label="Snapchat"
        >
          <FaSnapchat />
        </a>
        <a 
          href="mailto:your-email@example.com" 
          className={styles.icon} 
          aria-label="Email"
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
