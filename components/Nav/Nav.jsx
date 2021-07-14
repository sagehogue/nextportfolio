import React from "react";
import styles from "../../styles/Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.Nav}>
      <a className={styles.Link}>Home</a>
      <a className={styles.Link}>About</a>
      <a className={styles.Link}>Projects</a>
      <a className={styles.Link}>Services</a>
      <a className={styles.Link}>Contact</a>
    </div>
  );
}
