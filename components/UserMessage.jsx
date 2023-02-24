import React from "react";
import styles from "../styles/main.module.css";

export default function UserMessage({ text }) {
  return (
    <div className={styles.message_container}>
      <div className={styles.user_message}>{text}</div>
    </div>
  );
}
