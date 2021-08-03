import React from "react";
import styles from "./Wrapper.module.css";

export default function Wrapper({ children }) {
  return <main className={styles.wrapper}>{children}</main>;
}
