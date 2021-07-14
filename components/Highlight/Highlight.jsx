import React from "react";

import styles from "../../styles/Highlight.module.css";

export default function Highlight({ children }) {
  return <span className={styles.highlight}>{children}</span>;
}
