import styles from "../../styles/Paragraph.module.css";

import React from "react";

export default function Paragraph({ children, marginRight, small }) {
  return (
    <p
      className={[
        styles.paragraph,
        marginRight ? styles.marginRight : "",
        small ? styles.small : "",
      ].join(" ")}
    >
      {children}
    </p>
  );
}
