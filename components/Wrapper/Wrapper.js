import React from "react";
import styles from "./Wrapper.module.css";
import Theme from "../../styles/Theme";

export default function Wrapper({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
