import React from "react";
import styles from "../../styles/Button.module.css";
import Link from "next/link";

export default function Button({ children, cta, link, marginRight = false }) {
  let button;
  let classes = [
    styles.button,
    cta ? styles.cta : "",
    marginRight ? styles.marginRight : "",
  ];
  if (link) {
    return (
      <Link href={link}>
        <button className={classes.join(" ")} type="button">
          <a className={styles.anchor}></a>
          {children}
        </button>
      </Link>
    );
  } else {
  }
  return (
    <button className={classes.join(" ")} type="button">
      {children}
    </button>
  );
}
