import React from "react";
import styles from "../../styles/Button.module.css";
import Link from "next/link";

export default function Button({ children, cta, link }) {
  let button;
  if (link) {
    return (
      <Link href={link}>
        <button
          className={[styles.button, cta ? styles.cta : ""].join(" ")}
          type="button"
        >
          <a className={styles.anchor}></a>
          {children}
        </button>
      </Link>
    );
  } else {
  }
  return (
    <button
      className={[styles.button, cta ? styles.cta : ""].join(" ")}
      type="button"
    >
      {children}
    </button>
  );
}
