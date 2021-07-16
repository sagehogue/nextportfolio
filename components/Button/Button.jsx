import React from "react";
import styles from "../../styles/Button.module.css";

export default function Button({ children, cta }) {
  return (
    <button
      className={[styles.button, cta ? styles.cta : ""].join(" ")}
      type="button"
    >
      {children}
    </button>
  );
}
