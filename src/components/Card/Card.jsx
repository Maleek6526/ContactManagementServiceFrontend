import React from "react";
import styles from "./Card.module.css";

const Card = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
