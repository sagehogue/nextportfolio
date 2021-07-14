import React from "react";
import style from "../../styles/Page.module.css";

export default function Page({ children }) {
  return <div className={style.page}>{children}</div>;
}
