import React, { useState, useEffect } from "react";
import styles from "../styles/main.module.css";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className={styles.message_container}>
      <div className={styles.bot_message}>{isLoading ? "..." : message}</div>
    </div>
  );
}
