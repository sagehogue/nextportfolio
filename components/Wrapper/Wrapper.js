import React from "react";
import styles from "./Wrapper.module.css";
import Theme from "../../styles/Theme";

export default function Wrapper({ children }) {
  return <main className={styles.wrapper}>{children}</main>;
}
